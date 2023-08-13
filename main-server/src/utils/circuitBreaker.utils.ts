import axios from 'axios'
import express from 'express'
const app = express();
// Custom Circuit Breaker implementation with three states
class CircuitBreaker {
    state: 'CLOSED' | 'OPEN' | 'HALF-OPEN' = 'CLOSED';
    failureCount = 0;
    failureThreshold = 3;
    successThreshold = 2;
    resetTimeout = 5000;
    nextAttempt = Date.now();    async execute(action: () => Promise<any>): Promise<any> {
        switch (this.state) {
            case 'CLOSED':
                try {
                    const response = await action();
                    this.failureCount = 0;
                    return response;
                } catch (error) {
                    this.failureCount++;
                    if (this.failureCount >= this.failureThreshold) {
                        this.state = 'OPEN';
                        this.nextAttempt = Date.now() + this.resetTimeout;
                    }
                    throw error;
                }            case 'OPEN':
                if (Date.now() >= this.nextAttempt) {
                    this.state = 'HALF-OPEN';
                    return this.execute(action);
                } else {
                    throw new Error('Circuit is currently open. Please wait and try again later.');
                }            case 'HALF-OPEN':
                try {
                    const response = await action();
                    this.failureCount = 0;
                    if (this.failureCount >= this.failureThreshold) {
                        this.state = 'OPEN';
                        this.nextAttempt = Date.now() + this.resetTimeout;
                    } else {
                        this.state = 'CLOSED';
                    }
                    return response;
                } catch (error) {
                    this.failureCount++;
                    this.state = 'OPEN';
                    this.nextAttempt = Date.now() + this.resetTimeout;
                    throw new Error('Circuit is currently open. Please wait and try again later.');
                }
        }
    }
}
// const circuitBreaker = new CircuitBreaker();// Route to ping the second app
// app.get('/ping-second-app', async (req: Request, res: Response) => {
//     try {
//         const response = await circuitBreaker.execute(async () => {
//             try {
//                 const pingResponse = await axios.get('http://second-app-url/ping');
//                 return pingResponse.data;
//             } catch (error) {
//                 throw new Error('Failed to ping second app.');
//             }
//         });
//         res.json(response);
//     } catch (error) {
//         res.status(500).json({ error: 'Second app is currently unreachable.' });
//     }
// });const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Main app listening on port ${PORT}`);
// });