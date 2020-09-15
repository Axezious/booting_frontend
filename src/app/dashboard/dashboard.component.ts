import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { TicketStatus } from '../model/ticket-status';
import { TicketChart } from '../model/ticket-chart';
import { Tickets } from '../model/tickets';
import { Accounts } from '../model/accounts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  ticketStatus: TicketStatus;
  ticketOpen: number = 0;
  ticketClose: number = 0;
  ticketReOpen: number = 0;
  ticketChart: TicketChart[];
  tickets: Tickets[];
  ticketsHelper = [];
  account: Accounts;
  open = [];
  close = [];
  reOpen = [];
  agent: string;
  readonly base_url = 'http://147.139.130.49:8080';
  urlFoto: string = ""

  customer: string;
  constructor(private apiService: ApiService, private auth: AuthService, private authservice: AuthService,private route:ActivatedRoute) {
    this.account = this.authservice.getAccount();
    console.log("Ini profile");

    console.log(this.account);
    console.log(this.account.idUser.idRole.code);
    this.AllDashboard();
    this.getChart();
    this.getChartCilent();


  }

  tesAccount() {
    this.apiService
  }

  async AllDashboard() {
    if (this.account.idUser.idRole.code == "ADM" || this.account.idUser.idRole.code == "SPA") {
      console.log("admin");
      this.getDashboardAdmin();
    }
    else if (this.account.idUser.idRole.code == "CTM") {
      console.log("Customer");
      this.getDashboardCustomer();
    }
    else if (this.account.idUser.idRole.code == "AGT") {
      console.log("Agent");
      this.getDashboardAgent();
    }
    else {
      console.log("Client");
      this.getDashboardClient();
    }
  }

  async getDashboardAdmin() {
    this.apiService.dashboardAdmin().subscribe(result => {
      // console.log("Admin");
      console.log(result);
      this.ticketStatus = result;
      this.ticketOpen = this.ticketStatus.ticketOpen
      this.ticketClose = this.ticketStatus.ticketClose
      this.ticketReOpen = this.ticketStatus.ticketReopen
    });
    this.getRecentTickets();
  }

  getDashboardClient() {
    let client: string = this.account.idUser.idCompany.name
    this.apiService.dashboardClient(client).subscribe(result => {
      this.tickets = result;
      // console.log("Client");
      // var countfiltered = this.tickets.filter(function (element) {
      //   return element.idStatus.name == 'Open';
      // }).length menghitung total item yang di filter sesuai kondisi
      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].idStatus.name == "Open") {
          this.ticketOpen++;
        }
        else if (this.tickets[i].idStatus.name == "Close") {
          this.ticketClose++;
        }
        else {
          this.ticketReOpen++;
        }
      }
      console.log(this.tickets);
    });
    this.apiService.dashboardClient(client).subscribe(data => {
      this.tickets = data;
      if (this.tickets.length < 5) {
        for (let i = 0; i < this.tickets.length; i++) {
          this.ticketsHelper.push(this.tickets[i])
        }
        console.log(this.ticketsHelper);

      } else {
        for (let i = 0; i < 5; i++) {
          this.ticketsHelper.push(this.tickets[i]);
        }
        console.log(this.ticketsHelper);
      }
    })
  }

  async getDashboardAgent() {
    let agent = this.account.idUser.nip
    console.log(agent);
    this.apiService.dashboardAgent(agent).subscribe(result => {
      this.tickets = result;
      // console.log("agent");
      console.log(result);
      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].idStatus.name == "Open") {
          this.ticketOpen++;
        }
        else if (this.tickets[i].idStatus.name == "Close") {
          this.ticketClose++;
        }
        else {
          this.ticketReOpen++;
        }
      }
    });
    this.apiService.dashboardAgent(agent).subscribe(data => {
      this.tickets = data;
      if (this.tickets.length < 5) {
        for (let i = 0; i < this.tickets.length; i++) {
          this.ticketsHelper.push(this.tickets[i])
        }
        console.log(this.ticketsHelper);

      } else {
        for (let i = 0; i < 5; i++) {
          this.ticketsHelper.push(this.tickets[i]);
        }
        console.log(this.ticketsHelper);
      }
    })
  }

  async getDashboardCustomer() {
    let customer = this.account.idUser.nip
    this.apiService.dashboardCustomer(customer).subscribe(result => {
      this.tickets = result;
      // console.log("customer");
      console.log(result);
      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].idStatus.name == "Open") {
          this.ticketOpen++;
        }
        else if (this.tickets[i].idStatus.name == "Close") {
          this.ticketClose++;
        }
        else {
          this.ticketReOpen++;
        }
      }
    });
    this.apiService.dashboardCustomer(customer).subscribe(data => {
      this.tickets = data;
      if (this.tickets.length < 5) {
        for (let i = 0; i < this.tickets.length; i++) {
          this.ticketsHelper.push(this.tickets[i])
        }
        console.log(this.ticketsHelper);
      } else {
        for (let i = 0; i < 5; i++) {
          this.ticketsHelper.push(this.tickets[i]);
        }
        console.log(this.ticketsHelper);
      }
    })
  }

  getRecentTickets() {
    this.apiService.recentAdmin().subscribe(data => {
      this.tickets = data;
      if (this.tickets.length < 5) {
        for (let i = 0; i < this.tickets.length; i++) {
          this.ticketsHelper.push(this.tickets[i])
        }
        console.log(this.ticketsHelper);

      } else {
        for (let i = 0; i < 5; i++) {
          this.ticketsHelper.push(this.tickets[i]);
        }
        console.log(this.ticketsHelper);
      }
    })
  }
  getChartCilent() {
    let data = { 'name': `${this.account.idUser.idCompany.name}`, 'year': "2020" }
    this.apiService.getChartClient(data).subscribe(result => {
      console.log(result);

    })
    console.log(data.year);
  }


  getChart() {
    let a: string = "2020"
    this.apiService.getChart(a).subscribe((result: TicketChart[]) => {
      console.log(result);
      result.forEach(x => {
        if (x.name == 'Open') {
          this.open.push(x.january);
          this.open.push(x.february);
          this.open.push(x.march);
          this.open.push(x.april);
          this.open.push(x.may);
          this.open.push(x.june);
          this.open.push(x.july);
          this.open.push(x.august);
          this.open.push(x.september);
          this.open.push(x.october);
          this.open.push(x.november);
          this.open.push(x.december);
        }
        else if (x.name == 'Close') {
          this.close.push(x.january);
          this.close.push(x.february);
          this.close.push(x.march);
          this.close.push(x.april);
          this.close.push(x.may);
          this.close.push(x.june);
          this.close.push(x.july);
          this.close.push(x.august);
          this.close.push(x.september);
          this.close.push(x.october);
          this.close.push(x.november);
          this.close.push(x.december);
        }
        else {
          this.reOpen.push(x.january);
          this.reOpen.push(x.february);
          this.reOpen.push(x.march);
          this.reOpen.push(x.april);
          this.reOpen.push(x.may);
          this.reOpen.push(x.june);
          this.reOpen.push(x.july);
          this.reOpen.push(x.august);
          this.reOpen.push(x.september);
          this.reOpen.push(x.october);
          this.reOpen.push(x.november);
          this.reOpen.push(x.december);
        }
      });
    })
  }

  ngOnInit() {}
    


  date: Date = new Date();


  visitSaleChartData = [{
    label: 'Open',
    data: this.open,
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'Close',
    data: this.close,
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'Reopen',
    data: this.reOpen,
    borderWidth: 1,
    fill: false,
  }];

  visitSaleChartLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "July", "August", "Sept", "Oct", "Nov", "Dec"];


  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
      yAxes: [{
        ticks: {
          display: true,
          // min: 0,
          stepSize: 5,
          // max: 5

        },
        gridLines: {
          drawBorder: false,
          color: 'rgba(235,237,242,1)',
          zeroLineColor: 'rgba(235,237,242,1)'
        }
      }],
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: false,
          color: 'rgba(0,0,0,1)',
          zeroLineColor: 'rgba(235,237,242,1)',
        },
        ticks: {
          padding: 15,
          fontColor: "#9c9fa6",
          autoSkip: false,
        },
        categoryPercentage: 0.6,
        barPercentage: 0.9
      }]
    }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
      ],
      borderColor: [
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
        '#fe7096',
      ]
    },
    {
      backgroundColor: [
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
      ],
      borderColor: [
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
        '#047edf',
      ]
    },
    {
      backgroundColor: [

        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
      ],
      borderColor: [

        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
        '#07cdae',
      ]
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    }
  ];

  trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

}
