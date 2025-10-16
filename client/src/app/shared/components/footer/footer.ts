import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

  footer = [
    {
      title: "Quick Links",
      links: [
        {
          title: "Home", 
          link: "/", 
        },
        {
          title: "Articles", 
          link: "/articles", 
        },
        {
          title: "About Us", 
          link: "/about-us" 
        },
      ]
    },
    {
      title: "Featured",
      links: [
      {
          title: "Gods Name", 
          link: "Gods Name"
      },
      {
          title: "The Kingdom", 
          link: "The Kingdom"
      },
      {
          title: "Will Be Done", 
          link: "Will Be Done"
      }
      ]
    },
    {
        title: "Need Help?",
        links: [
        {
          title: "FAQ", 
          link: "FAQ" 
        },
        {
          title: "Support", 
          link: "Support", 
        },
        {
          title: "Contact Us", 
          link: "Contact Us"
        }
      ]
    }
  ];

  year = new Date().getFullYear();
}
