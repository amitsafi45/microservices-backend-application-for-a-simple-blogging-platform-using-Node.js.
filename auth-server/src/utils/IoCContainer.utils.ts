export class IOCContainer {
  private services: Map<Function, any> = new Map();

  register<T>(serviceClass: { new (): T }, serviceInstance: T): void {
    this.services.set(serviceClass, serviceInstance);
  }

  resolve<T>(serviceClass: { new (): T }): T {
    const serviceInstance = this.services.get(serviceClass);
    if (!serviceInstance) {
      throw new Error(`Service not registered: ${serviceClass.name}`);
    }
    return serviceInstance;
  }
}

export const iocContainer = new IOCContainer();
