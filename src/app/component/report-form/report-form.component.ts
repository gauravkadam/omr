import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser } from 'projects/ngx-csv-parser/src/public-api';
import { NgxCSVParserError } from 'projects/ngx-csv-parser/src/public-api';
import { environment } from '../../../environments/environment';
import { ExportToCsv } from 'export-to-csv';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponents {

  htmlContent: any;
  csvRecords: any[] = [];
  header: boolean = false;
  transformedContent = [];
  data = [];
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    title: '',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  createTemplate: boolean;
  selectedTemplate = "automobile";

  constructor(private ngxCsvParser: NgxCsvParser, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(res => {
      this.createTemplate = res.template;
    })
  }

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.csvRecords = result;
        this.csvRecords.splice(0, 1);
        for (let data of this.csvRecords) {
          let transformedContent = environment[this.selectedTemplate].replace(/r_title/gi, data[0]);
          transformedContent = transformedContent.replace(/r_url/gi, data[1]);
          transformedContent = transformedContent.replace(/r_application/gi, this.getUnorderedList(data[4]));
          transformedContent = transformedContent.replace(/r_company/gi, this.getUnorderedList(data[5]));
          this.data.push({
            Title: data[0],
            Content: transformedContent,
          });
        }
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  uploadFile() {
    document.getElementById('uploadFile').click();
  }

  downloadReport() {
    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(this.data);
  }

  onChange(event){
    console.log(event.target.value);
    this.selectedTemplate = event.target.value;
  }

  generateString(){
    console.log(this.htmlContent);
  }

  getUnorderedList(list){
    const listArray = list.split(/\r?\n/);
    let newList = [];
    for(let ele of listArray){
      newList.push(`<li>${ele}</li>`);
    }
    console.log('<ul>'+ newList.join('')+'</ul>');
    return `<ul> ${newList.join('')}</ul>`;
  }

}  
