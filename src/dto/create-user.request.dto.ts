export interface CreateUserRequestDto {
    userType: number,
    name: string;
    password: string;
    fullName: string;
    mobile?: string;
    email?: string;
    status: string;
    orgCode: string;
    branchCode: string;
}