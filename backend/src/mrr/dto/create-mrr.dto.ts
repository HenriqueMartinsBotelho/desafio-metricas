export class CreateMrrDto {
  mes: string;
  idDoAssinante: string;
  dataDeInicio: string;
  dataDeCancelamento: string | null;
  valorDaAssinatura: number;
  statusDaAssinatura: string;
}
