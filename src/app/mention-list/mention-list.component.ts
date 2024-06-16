import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';

@Component({
  selector: 'app-mention-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './mention-list.component.html',
  styleUrl: './mention-list.component.css'
})
export class MentionListComponent extends AngularNodeViewComponent {
  @Input('props') props!: Record<string, any>;

  selectedIndex = 0;

  upHandler() {
    this.selectedIndex =
      (this.selectedIndex + this.props['items'].length - 1) %
      this.props['items'].length;
  }

  downHandler() {
    this.selectedIndex = (this.selectedIndex + 1) % this.props['items'].length;
  }

  enterHandler() {
    this.selectItem(this.selectedIndex);
  }

  selectItem(index: number) {
    const item = this.props['items'][index];

    if (item) {
      this.props['command']({ id: item });
    }
  }

  onKeyDown({ event }: any) {
    if (event.key === 'ArrowUp') {
      this.upHandler();
      return true;
    }

    if (event.key === 'ArrowDown') {
      this.downHandler();
      return true;
    }

    if (event.key === 'Enter') {
      this.enterHandler();
      return true;
    }

    return false;
  }
}
