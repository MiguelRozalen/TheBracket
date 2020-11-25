import { Component } from '@angular/core';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NewDialogComponent } from './new-dialog/new-dialog.component';
import { shuffle, LZString } from './app.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public numberOfRounds: number

  public championship: Championship = {
    description: "The Bracket",
    name: "Rolland Garros",
    season: "2019",
    league: "ATP Word Tour",
    bestOf: 5,
    rounds: [],
    roundActive: 0,
  }

  public players: Player[] = [
    { name: "N. Djokovic" }, { name: "H. Hurkacz" }, { name: "H. Laaksonen" }, { name: "P. Martínez" }, { name: "J. Munar" }, { name: "S. Caruso" }, { name: "S. Stakhovsky" }, { name: "G. Simon" }, { name: "D. Shapovalov" }, { name: "J-L. Struff" }, { name: "R. Albot" }, { name: "T. Sandgren" }, { name: "L. Harris" }, { name: "L. Rosol" }, { name: "A. Bedene" }, { name: "B. Ćorić" }, { name: "F. Fognini" }, { name: "A. Seppi" }, { name: "G. García López" }, { name: "F. Delbonis" }, { name: "T. Fritz" }, { name: "B. Tomic" }, { name: "S. Johnson" }, { name: "R. Bautista" }, { name: "D. Lajović" }, { name: "T. Monteiro" }, { name: "C. Norrie" }, { name: "E. Benchetrit" }, { name: "M. Ymer" }, { name: "B. Rola" }, { name: "J. Millman" }, { name: "A. Zverev" }, { name: "D. Thiem" }, { name: "T. Paul" }, { name: "R. Molleker" }, { name: "A. Búblik" }, { name: "M. Janvier" }, { name: "P. Cuevas" }, { name: "J. Chardy" }, { name: "K. Edmund" }, { name: "F. Verdasco" }, { name: "D. Evans" }, { name: "A. Hoang" }, { name: "D. Džumhur" }, { name: "S. Travaglia" }, { name: "A. Mannarino" }, { name: "T. Daniel" }, { name: "G. Monfils" }, { name: "K. Khachanov" }, { name: "C-M. Stebe" }, { name: "G. Barrère" }, { name: "M. Ebden" }, { name: "M. Kližan" }, { name: "M. Kukushkin" }, { name: "S. Bolelli" }, { name: "L. Pouille" }, { name: "A. Davidovich" }, { name: "J. Thompson" }, { name: "I. Karlović" }, { name: "F. López" }, { name: "Y. Nishioka" }, { name: "M. McDonald" }, { name: "N. Jarry" }, { name: "J.M. del Potro" }, { name: "S. Tsitsipas" }, { name: "M. Marterer" }, { name: "P. Gunneswaran" }, { name: "H. Dellien" }, { name: "R. Carballés" }, { name: "A. Muller" }, { name: "F. Krajinović" }, { name: "F. Tiafoe" }, { name: "S. Wawrinka" }, { name: "J. Kovalík" }, { name: "R. Opelka" }, { name: "C. Garín" }, { name: "J. Tipsarević" }, { name: "G. Dimitrov" }, { name: "T. Fabbiano" }, { name: "M. Čilić" }, { name: "M. Cecchinato" }, { name: "N. Mahut" }, { name: "R. Haase" }, { name: "P. Kohlschreiber" }, { name: "J. Veselý" }, { name: "L. Mayer" }, { name: "M. Fucsovics" }, { name: "D. Schwartzman" }, { name: "M. Berrettini" }, { name: "P. Andújar" }, { name: "C. Ruud" }, { name: "E. Gulbis" }, { name: "M. Jaziri" }, { name: "O. Otte" }, { name: "L. Sonego" }, { name: "R. Federer" }, { name: "K. Nishikori" }, { name: "Q. Halys" }, { name: "J-W. Tsonga" }, { name: "P. Gojowczyk" }, { name: "A. Popyrin" }, { name: "U. Humbert" }, { name: "A. Ramos" }, { name: "L. Djere" }, { name: "Á. de Miñaur" }, { name: "B. Klahn" }, { name: "P. Carreño" }, { name: "J. Sousa" }, { name: "B. Paire" }, { name: "M. Copil" }, { name: "P-H. Herbert" }, { name: "D. Medvédev" }, { name: "N. Basilashvili" }, { name: "J.I. Lóndero" }, { name: "M. Zverev" }, { name: "R. Gasquet" }, { name: "A. Vatutin" }, { name: "C. Moutet" }, { name: "G. Andreozzi" }, { name: "G. Pella" }, { name: "D. Goffin" }, { name: "R. Berankis" }, { name: "M. Kecmanović" }, { name: "D. Kudla" }, { name: "Y. Maden" }, { name: "K. Coppejans" }, { name: "Y. Hanfmann" }, { name: "R. Nadal" }
  ]

  constructor(public dialog: MatDialog) {
    // this.championship.description = "Cuadro de Copa"
    // this.championship.name = "Diversificación"
    // this.championship.season = "2020-2021"
    // this.championship.league = "DISCAPACILeague"
    this.createBracket(false)
  }

  newChampionship() {
    let dialogRef = this.dialog.open(NewDialogComponent, {
      width: '600px',
      maxWidth: '90%',
      minHeight: 400,
      data: {
        championship: {
          description: "The Bracket",
          name: "Championship",
          season: "Season",
          league: "League Name",
          bestOf: 5,
          rounds: [],
          roundActive: 0,
        }, players: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.championship = result.championship
        this.players = result.players
        this.createBracket(true)
      }
    })
  }

  createBracket(randomize: boolean) {
    this.numberOfRounds = Math.ceil(Math.log2(this.players.length))
    for (var i = 0; i < this.numberOfRounds; i++) {

      var matches: Match[] = []
      var remainingPlayers: Player[]

      if (i == 0) {//Si es la primera ronda sacamos los partidos de los jugadores totales

        //Complete the bracket
        while (this.players.length < Math.pow(2, this.numberOfRounds)) {
          this.players.push({ name: "-" })
        }

        if (randomize) {
          this.players = shuffle(this.players)
        }

        remainingPlayers = JSON.parse(JSON.stringify(this.players))

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
        for (var j = 0; j < this.championship.rounds[this.championship.rounds.length - 1].matches.length / 2; j++) {
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
      if (i == this.numberOfRounds - 1) {
        name = "Final"
      } else if (i == this.numberOfRounds - 2) {
        name = "Semi Final"
      } else {
        name = "Round " + (i + 1)
      }

      this.championship.rounds.push({
        number: i,
        name: name,
        description: "Example A",
        matches: matches
      })
    }
  }

  loadChampionship($event: any) {
    var file = $event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (evt) => {
        //var gZipJson = LZString.decompressFromUTF16(evt.target.result)
        this.championship = JSON.parse(evt.target.result.toString())
      }
      reader.onerror = function (evt) {
        console.log(evt)
      }
    }
  }

  saveChampionship() {
    var sJson = JSON.stringify(this.championship)
    //var gZipJson = LZString.compressToUTF16(sJson)
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "The Bracket: " + this.championship.name + ".bracket");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  getPadding(index: number) {
    return 10 * (Math.pow(2, index + 2) - 3)
  }

  setResult(match: Match, round: Round, championship: Championship) {
    let dialogRef = this.dialog.open(ResultDialogComponent, {
      minWidth: '600px',
      data: { match, round, championship }
    });

    dialogRef.afterClosed().subscribe(result => {
      match.totalB = 0
      match.totalA = 0
      for (var i = 0; i < championship.bestOf; i++) {
        if (match.resultB[i] > match.resultA[i]) {
          match.totalB++;
        }
        if (match.resultB[i] < match.resultA[i]) {
          match.totalA++;
        }
      }

      if (match.totalA != match.totalB && (match.totalA > 0 || match.totalB > 0)) {
        match.winner = match.totalA > match.totalB ? match.playerA : match.playerB
        //Una vez que tenemos el ganador, lo pasamos a la siguiente ronda
        var index = Math.floor(round.matches.indexOf(match) / 2)
        var isTopTeam = round.matches.indexOf(match) % 2 == 0
        var indexRound = championship.rounds.indexOf(round)

        if (isTopTeam) {
          if (indexRound + 1 < championship.rounds.length)
            championship.rounds[indexRound + 1].matches[index].playerA = match.winner
        } else {
          if (indexRound + 1 < championship.rounds.length)
            championship.rounds[indexRound + 1].matches[index].playerB = match.winner
        }
      }

      //Calculate alctual round
      var stop: boolean = false
      championship.roundActive = championship.rounds.length - 1
      championship.rounds.forEach((round: Round, index) => {
        if (round.matches.some((m: Match) => m.playerA == undefined || m.playerB == undefined) && !stop) {
          championship.roundActive = Math.max(index - 1, 0)
          stop = true
        }
      })
    })
  }

}

export interface Championship {
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
