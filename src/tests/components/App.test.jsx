var expect=require('expect');

import App from "App";

describe("App", () => {
	it("should exist", () => {
		expect(App).toExist();
	});
	it("should make tests", () => {
		expect(1).toBe(1);
	});
});
