import { Component, OnInit, Inject, Renderer2, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { LoginService } from 'src/app/services/login.service';

import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [];

  /**
  * Fixed header menu on scroll
  */
  @HostListener('window:scroll', ['$event']) getScrollHeight() {    
    if (window.matchMedia('(min-width: 992px)').matches) {
      let header: HTMLElement = document.querySelector('.horizontal-menu') as HTMLElement;
      if(window.pageYOffset >= 60) {
        header.parentElement!.classList.add('fixed-on-scroll')
      } else {
        header.parentElement!.classList.remove('fixed-on-scroll')
      }
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuItems = MENU;

    /**
    * closing the header menu after route change in tablet/mobile devices
    */
    if (window.matchMedia('(max-width: 991px)').matches) {
      this.router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          document.querySelector('.horizontal-menu .bottom-navbar')!.classList.remove('header-toggled');
        }
      });
    }
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subMenus !== undefined ? item.subMenus.length > 0 : false;
  }

  /**
   * Returns true or false if given menu item is allowed or not
   * @param item menuItem
   */
  isAllowed(item: MenuItem) {
    item.isAllowed = true;
    if(item.label === "Admin" && !this.userInfo.user_isadmin)
      item.isAllowed = false;
    
    return item.isAllowed;
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();

    localStorage.setItem('isLoggedin', 'false')
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedin');


    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  /**
   * Toggle header menu in tablet/mobile devices
   */
  toggleHeaderMenu() {
    document.querySelector('.horizontal-menu .bottom-navbar')!.classList.toggle('header-toggled');
  }

  get userInfo(){
  
    let jwtToken = localStorage.getItem('token');
    
    if(!jwtToken)
      return false;

    const jwtHelper = new JwtHelperService();
    const userData = jwtHelper.decodeToken(jwtToken);

    return(userData);

  }
}
