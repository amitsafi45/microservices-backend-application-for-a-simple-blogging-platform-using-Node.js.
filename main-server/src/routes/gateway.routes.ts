import { Request, Response, Router, response } from "express";
import {  ServiceRegistryService } from "../services/serviceRegistry.service";
import axios from "axios";
import { container } from "tsyringe";
import HttpException from "../utils/HttpException";
import { Status } from "../constants/enum";
const router = Router();
const client = async () => {
  return await container.resolve(ServiceRegistryService).gets();
};
router.all("/:serviceName/:target", async (req: Request, res: Response) => {
  const clientDetail = await client();
  clientDetail.map((endPoint) => {
    let response;
    if (endPoint.serviceName === req.params.serviceName) {
      if (endPoint.status === Status.DIE) {
        throw HttpException.badRequest(
          " Requested Service are available for some time Please try later"
        );
      }
      let url;
      if (req.query.action) {
        url = `http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}/${req.query.action}`;
      } else {
        url = `http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}`;
      }
      switch (req.method.toString()) {
        case "POST":
          axios
            .post(url, req.body)
            .then((response) => {
              console.log(response.data, "kkkk");
              res.send(response.data);
            })
            .catch((error) => {
              res.status(500).send("Something went wrong with client");
            });
          break;
        case "GET":
          axios
            .get(url, req.body)
            .then((response) => {
              res.send(response.data);
            })
            .catch((error) => {
              res.status(500).send("Something went wrong with client");
            });
          break;
        case "PATCH":
          axios
            .patch(url, req.body)
            .then((response) => {
              console.log(response.data, "kkkk");
              res.send(response.data);
            })
            .catch((error) => {
              res.status(500).send("Something went wrong with client");
            });
          break;
        case "DELETE":
          axios
            .delete(url, req.body)
            .then((response) => {
              console.log(response.data, "kkkk");
              res.send(response.data);
            })
            .catch((error) => {
              res.status(500).send("Something went wrong with client");
            });
          break;
        default:
          res.status(500).send("Method not found");
      }
    } else {
      throw HttpException.notFound("Service not found");
    }
  });
});

export default router;
