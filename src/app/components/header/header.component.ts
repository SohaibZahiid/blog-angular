import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser!: User
  isAuthenticated: boolean = false

  isHamburgerOpen: boolean = false

  constructor(private authService: AuthService, private route: Router, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.authService.getCurrentUser$().subscribe(user => {
      if(user) {
        this.currentUser = user
      }
    })

    // Close hamburger menu when user clicks outside of it
    document.addEventListener('click', e => {
      const clickedElement = e.target as HTMLElement
      const clickedInsideMenu = this.elementRef.nativeElement.contains(clickedElement)
      if(!clickedInsideMenu && this.isHamburgerOpen) {
        this.isHamburgerOpen = false
      }
    })
  }

  logout(user: User) {
    this.authService.logout(user).subscribe(res => {
      const emptyUser: User = {
        _id: '',
        username: '',
        email: '',
        password: '',
        img: ''
      }
      this.authService.setCurrentUser$(emptyUser)
      this.authService.removeUserStorage()
      this.route.navigate(['/login'])
    });
  }

  toggleHamburger() {
    this.isHamburgerOpen = !this.isHamburgerOpen
  }

  closeHamburger() {
    this.isHamburgerOpen = false
  }


}
