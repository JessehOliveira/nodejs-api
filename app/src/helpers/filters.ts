import { Request } from "express";

type CustomFilter = {
	limit?: number,
	offset?: number
}

export function filterLimit(request: Request): number {
	return (request.query.filter as CustomFilter)?.limit ? +((request.query.filter as CustomFilter).limit as number): 10
}

export function filterOffset(request: Request): number {
	return (request.query.filter as CustomFilter)?.offset ? +((request.query.filter as CustomFilter).offset as number): 1
}