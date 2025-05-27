import { Socket, io } from 'socket.io-client';

// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io('http://localhost:3000'); // change to your backend URL
    }

    emit(event: string, data?: any) {
        this.socket.emit(event, data);
    }

    on(event: string, callback: (...args: any[]) => void) {
        this.socket.on(event, callback);
    }

    disconnect() {
        this.socket.disconnect();
    }
}
