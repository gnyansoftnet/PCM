export interface CreateUserDTO {
    userCode: string;
    name: string;
    fullName: string;
    password: string;
    orgCode: string;
    branchCode: string;
    mobile?: string;
    email?: string;
    createdBy?: string;
}