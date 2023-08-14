import { Request, Response, Router, response } from "express";
import { ServiceRegistryService } from "../services/serviceRegistry.service";
import axios from "axios";
import { container } from "tsyringe";
import HttpException from "../utils/HttpException";
import { Status } from "../constants/enum";
import { StatusCodes } from "../constants/statusCodes";
import { catchAsync } from "../utils/catchAsync";
import { isArray } from "class-validator";
import fs from "fs";
import FormData from "form-data";
const router = Router();
const client = async () => {
  return await container.resolve(ServiceRegistryService).gets();
};

router.all(
  "/:serviceName/:target",
  catchAsync(async (req: Request, res: Response) => {
    const clientDetail = await client();
    console.log(clientDetail, "client");
    if (clientDetail?.length <= 0) {
      return res.status(StatusCodes.NO_CONTENT).send({
        success: false,
        code: StatusCodes.NO_CONTENT,
        message: "No one Client Exist",
      });
    }
    let endPoint: any;
    for (endPoint of clientDetail) {
      let response;
      if (endPoint.serviceName === req.params.serviceName) {
        if (endPoint.status === Status.DIE) {
          return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            success: false,
            code: StatusCodes.SERVICE_UNAVAILABLE,
            message:
              "Requested Service are  not available for some time Please try later",
          });
        }
        let url;
        if (req.query.action) {
          url = `http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}/${req.query.action}`;
        } else {
          url = `http://${endPoint.host}:${endPoint.port}/api/${endPoint.serviceName}/${req.params.target}`;
        }
        switch (req.method.toString()) {
          case "POST":
            if (req.params.target === "media") {
              const files = req.files;

              if (!files) {
                return res.status(StatusCodes.BAD_REQUEST).json({success:false,
                  code:StatusCodes.BAD_REQUEST,
                  message:"files no were upload",})
              }

              const formData = new FormData();
              Object.keys(files).forEach((fileKey) => {
                //@ts-ignore
                formData.append("media", files[fileKey].data, {
                  //@ts-ignore
                  filename: files[fileKey].name,
                  //@ts-ignore
                  contentType: files[fileKey].mimetype,
                });
                Object.entries(req.body as object).forEach(([key, value]) => {
                  console.log(key, value, "key values");
                  formData.append(key, value);
                });
              });
              axios
                //@ts-ignore
                .post(url, formData, {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "multipart/form-data", // Set the content type for form data
                    Authorization: req.headers.authorization,
                  },
                })
                .then((response) => {
                  res.send(response.data);
                })
                .catch((error) => {
                  return res.status(error?.response?.status).json({
                    success: error?.response?.data?.success,
                    code: error?.response?.data?.code,
                    message: error?.response?.data?.message,
                  });
                });
            } else {
              axios
                .post(url, req.body, {
                  withCredentials: true,
                  headers: {
                    Authorization: req.headers.authorization,
                  },
                })
                .then((response) => {
                  if (response.headers["set-cookie"]) {
                    const cookie = response.headers["set-cookie"];

                    // Forward the cookie to the end users

                    //@ts-ignore
                    res.setHeader("set-cookie", cookie);
                  }
                  res.send(response.data);
                })
                .catch((error) => {
                  return res.status(error?.response?.status).json({
                    success: error?.response?.data?.success,
                    code: error?.response?.data?.code,
                    message: error?.response?.data?.message,
                  });
                });
            }

            break;
          case "GET":
            axios
              .get(url, {
                withCredentials: true,
                data: req.body,

                headers: {
                  Authorization: req.headers.authorization,
                  cookie: JSON.stringify(req.cookies),
                },
              })
              .then((response) => {
                res.send(response.data);
              })
              .catch((error) => {
                // if(error.response?.status)
                return res.status(error?.response?.status).json({
                  success: error?.response?.data?.success,
                  code: error?.response?.data?.code,
                  message: error?.response?.data?.message,
                });
              });
            break;
          case "PATCH":
            axios
              .patch(url, req.body, {
                withCredentials: true,
                headers: { Authorization: req.headers.authorization },
              })
              .then((response) => {
                if (response.headers["set-cookie"]) {
                  const cookie = response.headers["set-cookie"];

                  // Forward the cookie to the end users

                  //@ts-ignore
                  res.setHeader("set-cookie", cookie);
                }
                res.send(response.data);
              })
              .catch((error) => {
                return res.status(error?.response?.status).json({
                  success: error?.response?.data?.success,
                  code: error?.response?.data?.code,
                  message: error?.response?.data?.message,
                });
              });
            break;
          case "DELETE":
            axios
              .delete(url, {
                withCredentials: true,
                data: req.body,
                headers: { Authorization: req.headers.authorization },
              })
              .then((response) => {
                console.log(response.data, "kkkk");
                res.send(response.data);
              })
              .catch((error) => {
                return res.status(error?.response?.status).json({
                  success: error?.response?.data?.success,
                  code: error?.response?.data?.code,
                  message: error?.response?.data?.message,
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
      }
    }
  })
);

export default router;
