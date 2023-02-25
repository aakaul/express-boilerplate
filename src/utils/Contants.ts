export class Constants {
	static discordSyncEntryChannel = "sync-entry-err";
	static millisInOneDay = 8.64e7;
	static currMillis = () => Date.now();
	static dateInstance = () => new Date();
	static getLastStampToday=(stamp?:number)=> new Date(stamp).setHours(0,0,0,0)+8.65e7-1;
	static MB = 1048576;
}
