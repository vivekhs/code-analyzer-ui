import { Component, OnInit, Input } from '@angular/core';
import { AnalysisReport } from '../../model/analysis-report';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {

  @Input()
  analysisReports: AnalysisReport[];
  constructor() { }

  ngOnInit() {
  }

}
