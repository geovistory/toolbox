
import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketSupplier {
	private _socket = io.connect(process.env.SERVER);

	get(): any {
		return this._socket;
	}
}
