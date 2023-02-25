export type ModelObject<T> = {
	[Key in keyof Partial<T>]: T[Key];
};