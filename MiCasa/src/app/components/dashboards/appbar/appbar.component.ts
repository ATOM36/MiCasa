import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getJquery } from '@utility/js-libraries';
import { PrimeIcons } from 'primeng/api';

var $ = getJquery();

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
})
export class AppbarComponent implements OnInit, AfterViewInit {
  location!: string;
  links: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getLocation();

    //? Loading links depending on the context
    if (this.location?.includes('admin')) this.loadLinks();
    else if (this.location?.includes('agency')) this.loadAgencyLinks();
  }

  ngAfterViewInit(): void {
    //this.setAnimationConfig();
    // ---------Responsive-navbar-active-animation-----------
    function test() {
      var tabsNewAnim = $('#navbarSupportedContent');
      var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
      var activeItemNewAnim = tabsNewAnim.find('.active');
      var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
      var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
      var itemPosNewAnimTop = activeItemNewAnim.position();
      var itemPosNewAnimLeft = activeItemNewAnim.position();
      $('.hori-selector').css({
        top: itemPosNewAnimTop.top + 'px',
        left: itemPosNewAnimLeft.left + 'px',
        height: activeWidthNewAnimHeight + 'px',
        width: activeWidthNewAnimWidth + 'px',
      });
      $('#navbarSupportedContent').on('click', 'li', function (e) {
        $('#navbarSupportedContent ul li').removeClass('active');
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $('.hori-selector').css({
          top: itemPosNewAnimTop.top + 'px',
          left: itemPosNewAnimLeft.left + 'px',
          height: activeWidthNewAnimHeight + 'px',
          width: activeWidthNewAnimWidth + 'px',
        });
      });
    }
    $(document).ready(function () {
      setTimeout(function () {
        test();
      });
    });
    $(window).on('resize', function () {
      setTimeout(function () {
        test();
      }, 500);
    });
    $('.navbar-toggler').click(function () {
      $('.navbar-collapse').slideToggle(300);
      setTimeout(function () {
        test();
      });
    });

    let path = this._router.url;
    // --------------add active class-on another-page move----------
    jQuery(document).ready(function ($) {
      // Get current path and find target link

      // Account for home page with empty path

      var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
      // Add active class to target link
      target.parent().addClass('active');
    });

    // Add active class on another page linked
    // ==========================================
    // $(window).on('load',function () {
    //     var current = location.pathname;
    //     console.log(current);
    //     $('#navbarSupportedContent ul li a').each(function(){
    //         var $this = $(this);
    //         // if the current path is like this link, make it active
    //         if($this.attr('href').indexOf(current) !== -1){
    //             $this.parent().addClass('active');
    //             $this.parents('.menu-submenu').addClass('show-dropdown');
    //             $this.parents('.menu-submenu').parent().addClass('active');
    //         }else{
    //             $this.parent().removeClass('active');
    //         }
    //     })
    // });
  }

  loadLinks = () => {
    this.links = [
      {
        route: '/admin/dashboard',
        label: 'Dashboard',
        icon: PrimeIcons.CHART_LINE,
        tooltip: 'Aller au dashboard',
        active: () => this.location.includes('dashboard'),
      },
      {
        route: '/admin/account',
        label: 'Votre compte',
        icon: PrimeIcons.USER,
        tooltip: 'Gérer vos informations personnelles',
        active: () => this.location.includes('account'),
      },
      {
        route: '/admin/agence',
        label: 'Agences',
        icon: PrimeIcons.BUILDING,
        tooltip: 'Section des agences',
        active: () => this.location.includes('agence'),
      },
      {
        route: '/admin/users',
        label: 'Utilisateurs',
        icon: PrimeIcons.USERS,
        tooltip: 'Section des utilisateurs',
        active: () => this.location.includes('users'),
      },
      {
        route: '/admin/publications',
        label: 'Annonces',
        icon: PrimeIcons.IMAGE,
        tooltip: 'Section des annonces',
        active: () => this.location.includes('publications'),
      },
      {
        route: '/admin/reports',
        label: 'Les signalements',
        icon: PrimeIcons.THUMBS_DOWN,
        tooltip: 'Sections des signalements',
        active: () => this.location.includes('reports'),
      },
      {
        route: '/login',
        label: 'Déconnexion',
        icon: PrimeIcons.SIGN_OUT,
        tooltip: 'Terminer votre session',
      },
    ];
  };

  loadAgencyLinks = () => {
    this.links = [
      {
        route: '/agency/dashboard',
        label: 'Dashboard',
        icon: PrimeIcons.CHART_LINE,
        tooltip: "Consulter le dashboard de l'agence",
      },
      {
        route: '/agency/account',
        label: 'Votre compte',
        icon: PrimeIcons.USER,
        tooltip: "Consulter les données relatives à l'agence",
      },
      {
        route: '/agency/create',
        label: 'Publier une annonce',
        icon: PrimeIcons.PLUS_CIRCLE,
        tooltip: 'Ajouter une nouvelle annonce sur la plateforme',
      },
      {
        route: '/agency/publications',
        label: 'Vos annonces',
        icon: PrimeIcons.IMAGES,
        tooltip: 'Consulter toutes les annonces que vous avez publié',
      },
      {
        route: '/agency/edit',
        label: 'Mettre à jour',
        icon: PrimeIcons.USER_EDIT,
        tooltip: "Modifier les informations relative l'agence",
      },
      {
        route: '/login',
        label: 'Déconnexion',
        icon: PrimeIcons.SIGN_OUT,
        tooltip: 'Terminer votre session',
      },
    ];
  };

  lezgo(route: string) {
    if (route === '/login') {
      sessionStorage.clear();
      this._router.navigate([`${route}`]);
    } else this._router.navigate([`${route}`]);
  }

  getLocation = () =>
    this._activatedRoute.data.subscribe(
      (res) => (this.location = res['origin'])
    );
}
