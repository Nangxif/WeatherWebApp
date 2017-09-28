import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent{ 
    title = 'A weather search App!';
    public http;
    Data:any;
    begin=false;//控制天气结果列表是否出现
    searchAddress:string;//查询框文本的变量声明
    dateString:string[];//天气结果列表的七个日期数组声明
    DataList:any;//获取到的数据列表变量声明
    constructor(private Http:HttpClient) {
        this.http = Http;
    }
    now=new Date()//获取当前时间
    GetDateStr(AddDayCount :number) {
        this.now.setDate(this.now.getDate()+AddDayCount);//获取AddDayCount天后的日期
        let y = this.now.getFullYear();
        let m = this.now.getMonth()+1;//获取当前月份的日期
        let d = this.now.getDate();
        return y+"年"+m+"月"+d+"日";
    }
    ngOnInit() {//在组件加载进来的时候就执行
        this.dateString=[this.GetDateStr(0),this.GetDateStr(1),this.GetDateStr(2),this.GetDateStr(3),this.GetDateStr(4),this.GetDateStr(5),this.GetDateStr(6)]
    }
    start(){//点击查询之后执行的函数
        this.searchAddress = (document.getElementsByName('searchAddress')[0] as HTMLInputElement).value;//获取搜索框里面的文本
        if(this.searchAddress.length!=0){//如果搜索框里面的文本不为空，那么结果列表出现，并且发送请求
            this.begin=true;    
            this.http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q="+this.searchAddress+"&mode=json&units=metric&cnt=7&appid=f12159c1f548ea9ab7b5ff1907b1df50")
                .subscribe((data) => {
                    this.Data=data;
                    this.DataList=this.Data.list;  
                },
                err => { });
        }else{//如果搜索框里面的文本为空，那么结果列表不出现，并且不发送请求
            alert("请输入地址");
        }   
    } 
}
