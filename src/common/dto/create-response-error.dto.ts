export class CreateErrorResponseDto {
  statusCode: number;
  message: string | [];
  error: string;
}

export class JwtCreateErrorResponseDto extends CreateErrorResponseDto {
  hasTokenExpired?: boolean;
}
