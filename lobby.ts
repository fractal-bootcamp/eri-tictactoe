import { Socket } from "engine.io-client";
import { GameState, initialGameState } from "./game";

export type GameId = string
export type SocketId = string
export type Lobby = {
    gameId: GameId
    game: GameState
    connections: Set<SocketId>
    gameConnections: {
        player1: SocketId | null
        player2: SocketId | null
    }
}
export type Lobbies = Record<GameId, Lobby>

export const lobbies: Lobbies = {
    "randomId": {
        gameId: "randomId",
        game: initialGameState,
        connections: new Set(),
        gameConnections: {
            player1: null,
            player2: null
        }
    }
}

export function createLobby(gameId: string): Lobby {
    return {
        gameId,
        game: initialGameState,
        connections: new Set(),
        gameConnections: {
            player1: null,
            player2: null
        }
    }
}

// connect player 1, then player 2, then spectators
export function connectToLobby(lobby: Lobby, connectionId: SocketId): Lobby {
    const newLobby = structuredClone(lobby)

    if (newLobby.gameConnections.player1 === null) {
        return {
            ...newLobby,
            connections: newLobby.connections.add(connectionId),
            gameConnections: { ...newLobby.gameConnections, player1: connectionId }
        }
    }
    if (newLobby.gameConnections.player2 === null) {
        return { ...newLobby, connections: newLobby.connections.add(connectionId), gameConnections: { ...newLobby.gameConnections, player2: connectionId } }
    }

    return { ...newLobby, connections: newLobby.connections.add(connectionId) }

}