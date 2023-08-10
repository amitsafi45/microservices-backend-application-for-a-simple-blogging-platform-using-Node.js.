import { isPartiallyEmittedExpression } from "typescript";

export enum Environment{
    DEVELOPMENT="DEVELOPMENT",
    PRODUCTION="PRODUCTION"
}
export enum Mode{
    BEARER="BEARER"
}

export enum MediaType{
    PROFILE="PROFILE"
}

export enum TokenStatus{
    USED="USED",
    UN_USED="UN_USED"
}