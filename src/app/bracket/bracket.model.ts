import { shuffle } from '../app.utils'

export interface Bracket {
    name: string
    league: string
    season: string
    description: string
    bestOf: number
    rounds: Round[],
    roundActive: number
}

export interface Player {
    name: string
}

export interface Match {
    playerA: Player
    playerB: Player
    resultA: number[]
    resultB: number[]
    totalA: number
    totalB: number
    winner: Player
}

export interface Round {
    matches: Match[]
    name: string
    description: string
    number: number
}

export function generateDefaultPlayers(): Player[] {
    return [{ name: "N. Djokovic" }, { name: "H. Hurkacz" }, { name: "H. Laaksonen" }, { name: "P. Martínez" }, { name: "J. Munar" }, { name: "S. Caruso" }, { name: "S. Stakhovsky" }, { name: "G. Simon" }, { name: "D. Shapovalov" }, { name: "J-L. Struff" }, { name: "R. Albot" }, { name: "T. Sandgren" }, { name: "L. Harris" }, { name: "L. Rosol" }, { name: "A. Bedene" }, { name: "B. Ćorić" }, { name: "F. Fognini" }, { name: "A. Seppi" }, { name: "G. García López" }, { name: "F. Delbonis" }, { name: "T. Fritz" }, { name: "B. Tomic" }, { name: "S. Johnson" }, { name: "R. Bautista" }, { name: "D. Lajović" }, { name: "T. Monteiro" }, { name: "C. Norrie" }, { name: "E. Benchetrit" }, { name: "M. Ymer" }, { name: "B. Rola" }, { name: "J. Millman" }, { name: "A. Zverev" }, { name: "D. Thiem" }, { name: "T. Paul" }, { name: "R. Molleker" }, { name: "A. Búblik" }, { name: "M. Janvier" }, { name: "P. Cuevas" }, { name: "J. Chardy" }, { name: "K. Edmund" }, { name: "F. Verdasco" }, { name: "D. Evans" }, { name: "A. Hoang" }, { name: "D. Džumhur" }, { name: "S. Travaglia" }, { name: "A. Mannarino" }, { name: "T. Daniel" }, { name: "G. Monfils" }, { name: "K. Khachanov" }, { name: "C-M. Stebe" }, { name: "G. Barrère" }, { name: "M. Ebden" }, { name: "M. Kližan" }, { name: "M. Kukushkin" }, { name: "S. Bolelli" }, { name: "L. Pouille" }, { name: "A. Davidovich" }, { name: "J. Thompson" }, { name: "I. Karlović" }, { name: "F. López" }, { name: "Y. Nishioka" }, { name: "M. McDonald" }, { name: "N. Jarry" }, { name: "J.M. del Potro" }, { name: "S. Tsitsipas" }, { name: "M. Marterer" }, { name: "P. Gunneswaran" }, { name: "H. Dellien" }, { name: "R. Carballés" }, { name: "A. Muller" }, { name: "F. Krajinović" }, { name: "F. Tiafoe" }, { name: "S. Wawrinka" }, { name: "J. Kovalík" }, { name: "R. Opelka" }, { name: "C. Garín" }, { name: "J. Tipsarević" }, { name: "G. Dimitrov" }, { name: "T. Fabbiano" }, { name: "M. Čilić" }, { name: "M. Cecchinato" }, { name: "N. Mahut" }, { name: "R. Haase" }, { name: "P. Kohlschreiber" }, { name: "J. Veselý" }, { name: "L. Mayer" }, { name: "M. Fucsovics" }, { name: "D. Schwartzman" }, { name: "M. Berrettini" }, { name: "P. Andújar" }, { name: "C. Ruud" }, { name: "E. Gulbis" }, { name: "M. Jaziri" }, { name: "O. Otte" }, { name: "L. Sonego" }, { name: "R. Federer" }, { name: "K. Nishikori" }, { name: "Q. Halys" }, { name: "J-W. Tsonga" }, { name: "P. Gojowczyk" }, { name: "A. Popyrin" }, { name: "U. Humbert" }, { name: "A. Ramos" }, { name: "L. Djere" }, { name: "Á. de Miñaur" }, { name: "B. Klahn" }, { name: "P. Carreño" }, { name: "J. Sousa" }, { name: "B. Paire" }, { name: "M. Copil" }, { name: "P-H. Herbert" }, { name: "D. Medvédev" }, { name: "N. Basilashvili" }, { name: "J.I. Lóndero" }, { name: "M. Zverev" }, { name: "R. Gasquet" }, { name: "A. Vatutin" }, { name: "C. Moutet" }, { name: "G. Andreozzi" }, { name: "G. Pella" }, { name: "D. Goffin" }, { name: "R. Berankis" }, { name: "M. Kecmanović" }, { name: "D. Kudla" }, { name: "Y. Maden" }, { name: "K. Coppejans" }, { name: "Y. Hanfmann" }, { name: "R. Nadal" }]
}

export function generateDefaultBracket(randomize: boolean, players: Player[]): Bracket {
    let bracket: Bracket = {
        description: "The Bracket",
        name: "Rolland Garros",
        season: "2019",
        league: "ATP Word Tour",
        bestOf: 5,
        rounds: [],
        roundActive: 0,
    }

    let numberOfRounds = Math.ceil(Math.log2(players.length))
    for (var i = 0; i < numberOfRounds; i++) {
        var matches: Match[] = []
        var remainingPlayers: Player[]
        if (i == 0) {//Si es la primera ronda sacamos los partidos de los jugadores totales
            //Complete the bracket
            while (players.length < Math.pow(2, numberOfRounds)) {
                players.push({ name: "-" })
            }

            if (randomize) {
                players = shuffle(players)
            }
            remainingPlayers = JSON.parse(JSON.stringify(players))
            for (var j = 0; j + 1 < remainingPlayers.length; j += 2) {
                matches.push({
                    playerA: remainingPlayers[j],
                    playerB: remainingPlayers[j + 1],
                    resultA: [],
                    resultB: [],
                    totalA: 0,
                    totalB: 0,
                    winner: undefined
                })
            }
        } else {
            for (var j = 0; j < bracket.rounds[bracket.rounds.length - 1].matches.length / 2; j++) {
                matches.push({
                    playerA: undefined,
                    playerB: undefined,
                    resultA: [],
                    resultB: [],
                    totalA: 0,
                    totalB: 0,
                    winner: undefined
                })
            }
        }

        var name: string
        if (i == numberOfRounds - 1) {
            name = "Final"
        } else if (i == numberOfRounds - 2) {
            name = "Semi Final"
        } else {
            name = "Round " + (i + 1)
        }
        bracket.rounds.push({
            number: i,
            name: name,
            description: "Example A",
            matches: matches
        })
    }


    return bracket
}