import type { ResponseStatus } from '../constants';
import type { Account, User } from '@ui-guideline/db';

export interface BaseResponse {
  status: ResponseStatus;
}

export type SuccessResponse<T> = BaseResponse & {
  status: ResponseStatus.SUCCESS;
} & T;

export interface ErrorDetail {
  code: string;
  domain: string;
  handler: string;
  message: string;
}

export type ErrorResponse = BaseResponse & {
  status: ResponseStatus.ERROR;
  error: ErrorDetail;
};

// Modificamos ApiResponse para que muestre todas las propiedades posibles
export type ApiResponse<T> = {
  result: {
    status: ResponseStatus;
    error?: ErrorDetail;
  } & Partial<T>;
};

// Specific response type for each endpoint organized by domain

// Account
export type AccountResponse = ApiResponse<{ account: Account }>;
export type AccountsResponse = ApiResponse<{ accounts: Array<Account> }>;

// User
export type UserResponse = ApiResponse<{ user: User }>;
