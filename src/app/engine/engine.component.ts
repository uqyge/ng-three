import { EngineService } from './engine.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: [],
})
export class EngineComponent implements OnInit {
  private canEleId = 'renderCanvas';

  constructor(private engServ: EngineService) { }

  // console.log('wudi');

  ngOnInit() {
    this.engServ.createScene(this.canEleId);
    this.engServ.animate();
  }

}
