import { Component, OnInit} from '@angular/core';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { __values } from 'tslib';
import { PortalModel } from './interfaces/PortalModel';
import { PortalService } from './Services/portal.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-root',
  // template:`<router-outlet></router-outlet>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[MessageService]
})

export class AppComponent implements OnInit{
  title = 'FastLab';

  //Variável para o evento de click do botão de cópia.
  // isButtonActive = false;

  //Menu dropdown e seus itens MenuItem[];
  items: MenuItem[];

  public myData: Array<PortalModel> = []

  public myColuns = [
    {field: 'empresa', header: 'Empresa'},
    {field: 'linkMyLIMS', header: 'Link do myLIMS'},
    {field: 'senha', header: 'Senha'},
    {field: 'loginPortal', header: 'Usuário do Portal'},
    {field: 'senhaPortal', header: 'Senha do Portal'},
    {field: 'linkPortal', header: 'Portal myLIMS'},
    {field: 'senhaTeste', header: 'Senha Teste'}
 ]

  //Variável string que guarda o valor do input
  public textoVar: string = '';

  constructor(private messageService: MessageService,
    private service: PortalService,
    private _clipboardService: ClipboardService) {
      this.items = [
          {
              label: 'Limpar Tudo',
              icon: 'pi pi-times-circle',
              command: () => {
                  this.delete('info');
                    this.textoVar = "";
                    this.myData = [];
              }
          }
      ];
  }

  async ngOnInit(): Promise<void> {
    // let teste = this.service.getSenha(); // não assincrona - (puxa tudo de uma vez)
    // this.service.getSenha();
    // let testeAsync = await this.service.getSenhaAsync().then();
    // console.log(testeAsync);
    // console.log(teste);
    console.log(this.newGridLine)
  }

  newGridLine(textoVar: string) {
    return {
      empresa: this.textoVar.replaceAll(' ', '').toString().substring(0,1).toUpperCase()
       + this.textoVar.toString().trim().substring(1,100).replaceAll(' ', ''),
      linkMyLIMS: textoVar.replaceAll(' ', '') + '.mylimsweb.cloud'.replaceAll(' ', ''),
      senha: 'M3t@Lbs' + this.textoVar.replaceAll(' ','').substring(0,1).toUpperCase()
       + this.textoVar.replaceAll(' ', '').substring(1,3),
      loginPortal: this.textoVar.replaceAll(' ', '').toString().substring(0,1).toUpperCase().trim()
       + this.textoVar.replaceAll(' ', '').toString().trim().substring(1,100),
      senhaPortal: 'M3t@Lbs' + this.textoVar.replaceAll(' ', '').substring(0,1).toUpperCase()
       + this.textoVar.replaceAll(' ', '').substring(1,3)
        + "P".replaceAll(' ', ''),
      linkPortal: 'portal.mylimsweb.cloud'.replaceAll(' ', ''),
      senhaTeste: 'Qu@dr@d0'.replaceAll(' ', ''),
      trashIcon: '    '
    }
  }

  addEmpresa(): void  {
    if (this.textoVar.trim().length == 0 || this.textoVar.trim().toString() == ''){
      this.showError();
    }
    else {
      this.save('info');
      let adicionar = this.newGridLine(this.textoVar);
      this.myData.push(adicionar);
      this.textoVar = '';
    }
  }

  deleteRow(index: number) {
    this.delete('info');
    this.myData.splice(index, 1);
  }

  btnCopy(text: string){
    this._clipboardService.copy(text)
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Copiado!' });
  }

  //Functions para as mensagens de notificação
  save(severity: string) {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Gerado!' });
  }

   update(severity: string) {
      this.messageService.add({ severity: severity, summary: 'Sucesso', detail: 'Limpo!' });
  }

  delete(severity: string) {
      this.messageService.add({ severity: severity, summary: 'Deletado', detail: 'Limpo com sucesso!' });
  }

  showError() {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Formato Incorreto!' });
  }
  //fim das mensagens de notificação
}
