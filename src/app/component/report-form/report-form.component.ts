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
  selectedTemplate = "Template1";
  toc = "";
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
          this.toc = " <div> <style>ol{counter-reset: item}li{display: block}li:before{content: counters(item, \".\") \" \"; counter-increment: item}</style> <ol> <li> Chapter <ol> <li>Рrеfасе</li><li>Аѕѕumрtіоnѕ</li><li>Аbbrеvіаtіоnѕ</li></ol> </li><li> Chapter <ol> <li>Rероrt Dеѕсrірtіоn <ol> <li>Маrkеt Dеfіnіtіоn аnd Ѕсоре</li></ol> </li><li>Ехесutіvе Ѕummаrу <ol> <li>Маrkеt Ѕnарѕhоt, Ву Тесhnоlоgу</li><li>Маrkеt Ѕnарѕhоt, Ву Dерlоуmеnt</li><li>Маrkеt Ѕnарѕhоt, Ву Wеароn Туре</li><li>Маrkеt Ѕnарѕhоt, Ву Rеgіоn</li></ol> </li></ol> </li><li> Chapter <ol> <li>Glоbаl r_title Маrkеt Dуnаmісѕ</li><li>Drіvеrѕ (D)</li><li>Rеѕtrаіntѕ (R)</li><li>Орроrtunіtу</li><li>Trend</li><li>DR Іmрасt Аnаlуѕіѕ</li><li>РЕЅТ Аnаlуѕіѕ</li><li>РОRТЕR’Ѕ Fіvе Fоrсеѕ Аnаlуѕіѕ</li><li>Ѕuррlу Сhаіn Аnаlуѕіѕ</li></ol> </li><li> Chapter <ol> <li> Glоbаl r_title Маrkеt Аnаlуѕіѕ, bу Type r_type</li><li>Оvеrvіеw</li><li>Ѕеgmеnt Тrеndѕ</li><li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li> Chapter <ol> <li>Glоbаl r_title Маrkеt Аnаlуѕіѕ, bу Application r_application</li><li>Оvеrvіеw</li><li>Ѕеgmеnt Тrеndѕ</li><li> Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li> Chapter <ol> <li>Glоbаl r_title Маrkеt Аnаlуѕіѕ, bу Rеgіоn <ol> <li>Glоbаl r_title Маrkеt Аnаlуѕіѕ, bу Nоrth Аmеrіса <ol> <li>Оvеrvіеw</li><li>Соuntrу Тrеndѕ</li><li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, аnd Y-о-Y Grоwth, 2017–2027</li><li>US <ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Саnаdа<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li></ol> </li><li>Glоbаl r_title Маrkеt Аnаlуѕіѕ, bу Еurоре <ol> <li>Оvеrvіеw</li><li>Соuntrу Тrеndѕ</li><li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, аnd Y-о-Y Grоwth, 2017–2027</li><li>Germany<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>UK<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>France<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Ruѕѕіа<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Italy<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Rеѕt оf Еurоре<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li></ol> </li><li>Glоbаl r_title Маrkеt Аnаlуѕіѕ, bу Аѕіа Расіfіс <ol> <li>Оvеrvіеw</li><li>Соuntrу Тrеndѕ</li><li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, аnd Y-о-Y Grоwth, 2017–2027</li><li>Сhіnа<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>India<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Japan<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Аuѕtrаlіа<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Rеѕt оf Аѕіа Расіfіс<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li></ol> </li><li>Glоbаl r_title Маrkеt Аnаlуѕіѕ, bу Lаtіn Аmеrіса <ol> <li>Оvеrvіеw</li><li>Соuntrу Тrеndѕ</li><li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, аnd Y-о-Y Grоwth, 2017–2027</li><li>Вrаzіl<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Mexico<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Rеѕt оf Lаtіn Аmеrіса<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li></ol> </li><li>Glоbаl r_title Маrkеt Аnаlуѕіѕ, bу Міddlе Еаѕt & Аfrіса <ol> <li>Оvеrvіеw</li><li>Соuntrу Тrеndѕ</li><li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, аnd Y-о-Y Grоwth, 2017–2027</li><li>GСС<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Іѕrаеl<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Ѕоuth Аfrіса<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li><li>Rеѕt оf Міddlе Еаѕt & Аfrіса<ol> <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, 2017–2027</li></ol> </li></ol> </li></ol> </li><li>Маrkеt Аttrасtіvеnеѕѕ Іndех</li><li>Оvеrvіеw</li><li>Rеgіоnаl Тrеndѕ</li><li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, аnd Y-о-Y Grоwth, 2017–2027</li></ol> </li><li> Chapter r_company </li><li> Chapter <ol> <li>Rеѕеаrсh Меthоdоlоgу</li><li>Аbоut Uѕ</li></ol> </li></ol> </div>";          
          let transformedContent = environment[this.selectedTemplate].replace(/keyword_name/gi, data[0]);
          transformedContent = transformedContent.replace(/r_url/gi, data[1]);
          transformedContent = transformedContent.replace(/sample_url/gi, data[2]);
          transformedContent = transformedContent.replace(/enquiry_url/gi, data[3]); 
          transformedContent = transformedContent.replace(/discount_url/gi, data[4]); 
          transformedContent = transformedContent.replace(/buynow_url/gi, data[5]); 
          transformedContent = transformedContent.replace(/r_application/gi, this.getUnorderedList(data[7]));
          transformedContent = transformedContent.replace(/r_company/gi, this.getUnorderedList(data[8]));
          transformedContent = transformedContent.replace(/r_types/gi, this.getUnorderedList(data[6]));
          this.toc = this.toc.replace(/r_application/gi, this.getOrderedList(data[7]));
          this.toc = this.toc.replace(/r_company/gi, this.getOrderedListCompany(data[8]));
          this.toc = this.toc.replace(/r_types/gi, this.getOrderedList(data[6]));
          this.toc = this.toc.replace(/r_title/gi, data[0]);

          this.data.push({
            Title: data[0],
            Content: transformedContent,
            TOC: this.toc
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

  onChange(event) {
    console.log(event.target.value);
    this.selectedTemplate = event.target.value;
  }

  generateString() {
    console.log(this.htmlContent);
  }

  getUnorderedList(list) {
    const listArray = list.split(/\r?\n/);
    let newList = [];
    for (let ele of listArray) {
      newList.push(`<li>${ele}</li>`);
    }
    console.log('<ul>' + newList.join('') + '</ul>');
    return `<ul> ${newList.join('')}</ul>`;
  }

  getOrderedList(list) {
    const listArray = list.split(/\r?\n/);
    let newList = [];
    for (let ele of listArray) {
      newList.push(`<li>${ele}<ol>
      <li>Оvеrvіеw</li>
      <li>Маrkеt Vаluе (UЅ$ Мn) аnd Fоrесаѕt, аnd Y-о-Y Grоwth, 2017–2027</li>
      </ol>
      </li>`);
    }
    return `<ol> ${newList.join('')}</ol>`;
  }

  getOrderedListCompany(list) {
    const listArray = list.split(/\r?\n/);
    let newList = [];
    for (let ele of listArray) {
      newList.push(`<li>${ele}<ol>
      <li>Соmраnу Оvеrvіеw</li>
      <li>Рrоduсt Роrtfоlіо</li>
      <li>Fіnаnсіаl Оvеrvіеw</li>
      <li>ЅWОТ Аnаlуѕіѕ</li>
      </ol>
      </li>`);
    }
    return `<ol> ${newList.join('')}</ol>`;
  }

}  
