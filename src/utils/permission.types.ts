export type PermissionAction = "READ" | "WRITE" | "UPDATE" | "DELETE";

// Maps HTTP method → permission column in tbl_01_m_p_useraccess
export const METHOD_PERMISSION_MAP: Record<string, PermissionAction> = {
    GET: "READ",
    POST: "WRITE",
    PUT: "UPDATE",
    DELETE: "DELETE",
};