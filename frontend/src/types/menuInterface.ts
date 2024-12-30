export interface MenuInter { 
  menuId:string,
  menuName:string, 
  path:string,
  icon:string,
  children?: MenuInter[];
}