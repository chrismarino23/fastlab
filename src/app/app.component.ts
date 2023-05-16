import { Component, OnInit} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
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
      empresa: textoVar.toString().substring(0,1).toUpperCase().trim()
       + textoVar.toString().trim().substring(1,100),
      linkMyLIMS: textoVar + '.mylimsweb.cloud',
      senha: 'M3t@Lbs' + this.textoVar.substring(0,1).toUpperCase().replaceAll(' ','')
       + this.textoVar.substring(1,3),
      loginPortal: textoVar.toString().substring(0,1).toUpperCase().trim()
       + textoVar.toString().trim().substring(1,100),
      senhaPortal: 'M3t@Lbs' + this.textoVar.substring(0,1).toUpperCase()
       + this.textoVar.substring(1,3)
        + "P",
      linkPortal: 'portal.mylimsweb.cloud',
      senhaTeste: 'Qu@dr@d0'
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

  btnCopy(text: string){
    this._clipboardService.copy(text)
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Copiado!' });
  }

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
}
