export interface UserResponseDto {
    userId: number;
    userCode: string;
    name: string;
    fullName: string;
    email?: string | null;
    mobile?: string | null;
    status: string;
    orgCode: string;
    branchCode: string;
    createDate: Date;
    modifiedDate: Date;
    roleId: number;
}