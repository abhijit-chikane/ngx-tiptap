import { Component, Injector, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Editor } from '@tiptap/core';
import Mention from '@tiptap/extension-mention';
import { AngularRenderer, NgxTiptapModule } from 'ngx-tiptap';
import tippy from 'tippy.js';
import { MentionListComponent } from './mention-list/mention-list.component';
import { FormsModule } from '@angular/forms';
import StarterKit from '@tiptap/starter-kit';
import { PluginKey } from '@tiptap/pm/state';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgxTiptapModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 temp = '';
 private injector = inject(Injector);

  editor = new Editor({
    editorProps: {
      attributes: {
        class:
          'p-2 border-black focus:border-blue-700 border-2 rounded-md outline-none',
      },
    },
    extensions: [
      StarterKit,
      Mention.extend({
        name: 'first',
        renderHTML(props) {
          const { node } = props;
          return [
            "a",
            {
              class: 'mention',
              userkey: node.attrs['id'],
              "data-id": node.attrs['id'],
              "data-linked-resource-type": "userinfo",
              href: `/profile/${node.attrs['id']}/${node.attrs['label']}`,
            },
            `@${node.attrs['id']}`,
          ];
        }
      }).configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          char: '@',
          pluginKey: new PluginKey("s1"),
          items: (obj) => {
            return [
              'Lea Thompson',
              'Cyndi Lauper',
              'Tom Cruise',
              'Madonna',
              'Jerry Hall',
              'Joan Collins',
              'Winona Ryder',
              'Christina Applegate',
              'Alyssa Milano',
              'Molly Ringwald',
              'Ally Sheedy',
              'Debbie Harry',
              'Olivia Newton-John',
              'Elton John',
              'Michael J. Fox',
              'Axl Rose',
              'Emilio Estevez',
              'Ralph Macchio',
              'Rob Lowe',
              'Jennifer Grey',
              'Mickey Rourke',
              'John Cusack',
              'Matthew Broderick',
              'Justine Bateman',
              'Lisa Bonet',
            ]
              .filter((item) =>
                item.toLowerCase().startsWith(obj.query.toLowerCase())
              )
              .slice(0, 10);
          },
          render: () => {
            let renderer: AngularRenderer<MentionListComponent, MentionListComponent>;
            let popup:any;

            return {
              onStart: (props) => {
                renderer = new AngularRenderer(MentionListComponent, this.injector, {
                  props,
                });

                renderer.updateProps({ props });

                popup = tippy('body', {
                  appendTo: () => document.body,
                  content: renderer.dom,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                });

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onUpdate(props) {
                renderer.updateProps({ props });

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onKeyDown(props) {
                return renderer.instance.onKeyDown(props);
              },
              onExit() {
                popup[0].destroy();
                renderer.destroy();
              },
            };
          },
        },
      }),

      Mention.extend({name: 'second'}).configure({
        HTMLAttributes: {
          class: 'mention',
        },
        
        suggestion: {
          char: '#',
          pluginKey: new PluginKey("s2"),
          items: (obj) => {
            return [
              'Lea Thompson',
              'Cyndi Lauper',
              'Tom Cruise',
              'Madonna',
              'Jerry Hall',
              'Joan Collins',
              'Winona Ryder',
              'Christina Applegate',
              'Alyssa Milano',
              'Molly Ringwald',
              'Ally Sheedy',
              'Debbie Harry',
              'Olivia Newton-John',
              'Elton John',
              'Michael J. Fox',
              'Axl Rose',
              'Emilio Estevez',
              'Ralph Macchio',
              'Rob Lowe',
              'Jennifer Grey',
              'Mickey Rourke',
              'John Cusack',
              'Matthew Broderick',
              'Justine Bateman',
              'Lisa Bonet',
            ]
              .filter((item) =>
                item.toLowerCase().startsWith(obj.query.toLowerCase())
              )
              .slice(0, 10);
          },
          render: () => {
            let renderer: AngularRenderer<MentionListComponent, MentionListComponent>;
            let popup:any;

            return {
              onStart: (props) => {
                renderer = new AngularRenderer(MentionListComponent, this.injector, {
                  props,
                });

                renderer.updateProps({ props });

                popup = tippy('body', {
                  appendTo: () => document.body,
                  content: renderer.dom,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                });

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },
              onUpdate(props) {
                renderer.updateProps({ props });

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
                
              },
              onKeyDown(props) {
                return renderer.instance.onKeyDown(props);
              },
              onExit() {
                popup[0].destroy();
                renderer.destroy();
              },
            };
          },
        },
      }),
    ],
    onUpdate: (res) => {
      this.temp = res.editor.getHTML();
      console.log('result > ', res.editor.getJSON());
    },
  });

  ngOnInit(){
    this.editor.getHTML()
    this.editor.commands.clearContent(false);
  }
}
