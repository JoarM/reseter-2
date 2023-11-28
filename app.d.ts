/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./lucia.js").Auth;
	type DatabaseUserAttributes = {
		displayname: string;
        email: string;
	};
	type DatabaseSessionAttributes = {};
}