export interface ErrorResponse {
    code?: string;
    data?: any;
    additional_errors?: Array<AdditionalError>;
    message: string;
}

interface AdditionalError {
    code?: string;
    data?: any;
    message: string
}
