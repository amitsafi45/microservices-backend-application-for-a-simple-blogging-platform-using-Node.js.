import { Request, Response, Router, response } from "express";
import { ServiceRegistryService } from "../services/serviceRegistry.service";
import axios from "axios";
import { container } from "tsyringe";
import HttpException from "../utils/HttpException";
import { Status } from "../constants/enum";
import { StatusCodes } from "../constants/statusCodes";
import { catchAsync } from "../utils/catchAsync";
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
          " Requested Service are  not available for some time Please try later"
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
            .post(url,req.body,{withCredentials:true})
            .then((response) => {
              res.send(response.data);
            })
            .catch((error) => {
              return res.status( error.response.status).json({
                success: error.response.data.success,
                code: error.response.data.code,
                message: error.response.data.message,
              });
            });
          break;
        case "GET":
          axios
            .get(url,{withCredentials:true,data:req.body,headers:{Authorization:req.headers.authorization}})
            .then((response) => {
              res.send(response.data);
            })
            .catch((error) => {

              return res.status( error.response.status).json({
                success: error.response.data.success,
                code: error.response.data.code,
                message: error.response.data.message,
              });
            });
          break;
        case "PATCH":
          axios
            .patch(url, {withCredentials:true,data:req.body,headers:{Authorization:req.headers.authorization}})
            .then((response) => {
              res.send(response.data);
            })
            .catch((error) => {
              return res.status( error.response.status).json({
                success: error.response.data.success,
                code: error.response.data.code,
                message: error.response.data.message,
              });
            });
          break;
        case "DELETE":
          axios
            .delete(url, {withCredentials:true,data:req.body,headers:{Authorization:req.headers.authorization}})
            .then((response) => {
              console.log(response.data, "kkkk");
              res.send(response.data);
            })
            .catch((error) => {
              return res.status( error.response.status).json({
                success: error.response.data.success,
                code: error.response.data.code,
                message: error.response.data.message,
              });
            });
          break;
        default:
          return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            success: false,
            code: StatusCodes.METHOD_NOT_ALLOWED,
            message: "Method Not Found",
          });
      }
    } else {
      return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        success: false,
        code: StatusCodes.METHOD_NOT_ALLOWED,
        message: "Service Not Found",
      });
    }
  });
});

export default router;
