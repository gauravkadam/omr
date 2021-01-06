import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser } from 'projects/ngx-csv-parser/src/public-api';
import { NgxCSVParserError } from 'projects/ngx-csv-parser/src/public-api';
import { environment } from '../../../environments/environment';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponents {


  csvRecords: any[] = [];
  header: boolean = false;
  transformedContent = [];
  data = [];

  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    title: '',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };



  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  // @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        console.log('Result', result);
        this.csvRecords = result;
        this.csvRecords.splice(0, 1);
        for (let data of this.csvRecords) {
          // console.log(data);
          this.data.push({
            Title: data[0],
            Content: environment.automobile.replace('{title}', data[0]),
          });
          // this.transformedContent.push(environment.data.replace('{title}', data[0]));
        }
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  uploadFile() {
    document.getElementById('uploadFile').click();
  }

  downloadReport() {
    // const downloadLink = document.createElement('a');
    // const blob = new Blob(['\ufeff', `Title,Content\n3,4\n7,5`]);
    // const url = URL.createObjectURL(blob);
    // downloadLink.href = url;
    // downloadLink.download = 'template.csv';
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);
    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(this.data);
  }

}  
