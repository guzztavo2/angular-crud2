export class Modal {
  public title: string;
  public description: string;

  public canClose: boolean;
  public showFooter: boolean;
  public loadingIcon: boolean;
  public display: boolean;
  public visibility: boolean;
  public redirect: string | false;

  constructor(
    title: string | undefined = undefined,
    description: string | undefined = undefined,
    canClose: boolean | undefined = undefined,
    showFooter: boolean | undefined = undefined,
    loadingIcon: boolean | undefined = undefined,
    display: boolean | undefined = undefined,
    visibility: boolean | undefined = undefined,
    redirect: string | undefined = undefined
  ) {
    this.title = title == undefined ? '' : title;
    this.description = description == undefined ? '' : description;

    this.canClose = canClose == undefined ? true : canClose;
    this.showFooter = showFooter == undefined ? true : showFooter;
    this.loadingIcon = loadingIcon == undefined ? true : loadingIcon;
    this.display = display == undefined ? true : display;
    this.visibility = visibility == undefined ? true : visibility;
    this.redirect = redirect == undefined ? false : redirect;
  }

  public setVisibleModal(val: boolean) {
    this.visibility = val;

    setTimeout(() => {
      this.display = val;
    }, 100);
  }
}
