import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { shuffle } from '../app.utils';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { JsonService } from '../shared/json.service';
import { Bracket, Player, Match, Round, generateDefaultBracket, generateDefaultPlayers } from './bracket.model';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {

  public bracket: Bracket

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private jsonService: JsonService) {

  }

  ngOnInit() {
    let bracketName = this.route.snapshot.paramMap.get('name')
    if (bracketName) {
      this.jsonService.getJSON(bracketName).subscribe((bracket: Bracket) => {
        try {
          this.bracket = bracket
          console.log(bracket)
        } catch (err) {
          console.log(err)
        }
      }, err => {
        console.log(err)
        this.bracket = generateDefaultBracket(false, generateDefaultPlayers())
      })
    } else {
      this.bracket = generateDefaultBracket(false, generateDefaultPlayers())
    }
  }

  loadBracket($event: any) {
    var file = $event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (evt) => {
        //var gZipJson = LZString.decompressFromUTF16(evt.target.result)
        this.bracket = JSON.parse(evt.target.result.toString())
      }
      reader.onerror = function (evt) {
        console.log(evt)
      }
    }
  }

  saveBracket() {
    var sJson = JSON.stringify(this.bracket)
    //var gZipJson = LZString.compressToUTF16(sJson)
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "The Bracket: " + this.bracket.name + ".bracket");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  newBracket() {
    let dialogRef = this.dialog.open(NewDialogComponent, {
      width: '600px',
      maxWidth: '90%',
      minHeight: 400,
      data: {
        bracket: {
          description: "The Bracket",
          name: "Bracket",
          season: "Season",
          league: "League Name",
          bestOf: 5,
          rounds: [],
          roundActive: 0,
        },
        players: []
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bracket = result.bracket
        this.bracket.rounds = generateDefaultBracket(true, result.players).rounds
      }
    })
  }

  setResult(match: Match, round: Round, bracket: Bracket) {
    let dialogRef = this.dialog.open(ResultDialogComponent, {
      minWidth: '600px',
      data: { match, round, bracket }
    });

    dialogRef.afterClosed().subscribe(result => {
      match.totalB = 0
      match.totalA = 0
      for (var i = 0; i < bracket.bestOf; i++) {
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
        var indexRound = bracket.rounds.indexOf(round)

        if (isTopTeam) {
          if (indexRound + 1 < bracket.rounds.length)
            bracket.rounds[indexRound + 1].matches[index].playerA = match.winner
        } else {
          if (indexRound + 1 < bracket.rounds.length)
            bracket.rounds[indexRound + 1].matches[index].playerB = match.winner
        }
      }

      //Calculate alctual round
      var stop: boolean = false
      bracket.roundActive = bracket.rounds.length - 1
      bracket.rounds.forEach((round: Round, index) => {
        if (round.matches.some((m: Match) => m.playerA == undefined || m.playerB == undefined) && !stop) {
          bracket.roundActive = Math.max(index - 1, 0)
          stop = true
        }
      })
    })
  }

  getPadding(index: number) {
    return 10 * (Math.pow(2, index + 2) - 3)
  }
}