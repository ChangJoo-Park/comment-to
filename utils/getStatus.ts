export const getStatus = (projectDoc: any, status: string) => {
  return projectDoc.status.find((s: any) => s.key === status)
}
