import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    // this.http.get('http://localhost:5000/api/sys/routes')
    //   .toPromise()
    //   .then(routes => {
    //     console.log(routes);
    //   })
  }
}
