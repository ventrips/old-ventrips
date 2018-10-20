import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { AuthService } from '../../services/firebase/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public environment = environment;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.smoothScrolling();
  }

  showBar(): boolean {
    return _.isEqual(this.router.url, '/') || _.includes(this.router.url, 'splash');
  }

  isActive(currentNav: string): boolean {
    if (_.isEqual(this.router.url, '')) {
      return true;
    }

    return _.isEqual(this.router.url, currentNav);
  }

  smoothScrolling(): void {
    // Smooth scrolling using jQuery easing
    jQuery('a.js-scroll-trigger[href*=\'#\']:not([href=\'#\'])').click(function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        let target = jQuery(this.hash);
        target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          jQuery('html, body').animate({
            scrollTop: (target.offset().top - 54)
          }, 1000, 'easeInOutExpo');
          return false;
        }
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    jQuery('.js-scroll-trigger').click(function () {
      jQuery('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    jQuery('body').scrollspy({
      target: '#mainNav',
      offset: 56
    });

    // Collapse Navbar
    const navbarCollapse = function () {
      const mainNav = jQuery('#mainNav');
      if (mainNav.offset().top > 100) {
        mainNav.addClass('navbar-shrink');
      } else {
        mainNav.removeClass('navbar-shrink');
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    jQuery(window).scroll(navbarCollapse);

    // Hide navbar when modals trigger
    jQuery('.portfolio-modal').on('show.bs.modal', function (e) {
      jQuery('.navbar').addClass('d-none');
    });
    jQuery('.portfolio-modal').on('hidden.bs.modal', function (e) {
      jQuery('.navbar').removeClass('d-none');
    });
  }
}
