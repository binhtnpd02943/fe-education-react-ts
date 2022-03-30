import moment from "moment"

export const formatMoney = (value: string | number | undefined) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const parserMoney = (value: any) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  return value?.toString()?.replace(/(,*)/g, '');
}
export const formatPercent = (value: string | number | undefined) => {
  if (value === undefined) {
    return '';
  }
  const val = value.toString();
  return `${Number.parseFloat(val) * 100}%`;
}
export const formatNumber = (value: string | number | undefined) => {
  if(!value){
    return '';
  }
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  return Number.parseFloat(value.toString()).toFixed(2);
}
export const parserPercent = (value: any) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  return value.replace('%', '');
}
export const formatCurrency = (value: string | number | undefined) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  let stringValue = String(value);
  if (stringValue === '-') {
    return stringValue;
  }
  stringValue = stringValue.replaceAll(/[^0-9.-]/g, "");
  const convertValue = stringValue;
  const checkSymbol = stringValue.includes('-');
  const checkDot = stringValue.includes('.')

  const valueSplit = stringValue.split('.');
  stringValue = checkSymbol ? valueSplit[0].substring(0, 15) : valueSplit[0].substring(0, 14);

  if (valueSplit[1]) {
    stringValue = stringValue + '.' + valueSplit[1].substring(0, 2);
  }


  const result = Number.parseFloat(stringValue);
  if (isNaN(result)) {
    return ''
  }
  let display = String(result).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (convertValue.indexOf('.') === convertValue.length - 1 && checkDot) {
    display += '.';
  }
  if (convertValue.indexOf('-') === 0 && display.indexOf('-') !== 0) {
    display = '-' + display;
  }
  if (convertValue.length > 2 && (convertValue.indexOf('.') == convertValue.length - 2) && (convertValue.lastIndexOf('0') == convertValue.length - 1)) {
    display += '.0';
  }

  return display;
}

export const parserCurrency = (value: string | number | undefined) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  let stringValue = String(value);
  if (stringValue === '-') {
    return stringValue;
  }
  stringValue = stringValue.replaceAll(/[^0-9.-]/g, "");
  const checkSymbol = stringValue.includes('-');

  const valueSplit = stringValue.split('.');
  stringValue = checkSymbol ? valueSplit[0].substring(0, 15) : valueSplit[0].substring(0, 14);

  if (valueSplit[1]) {
    stringValue = stringValue + '.' + valueSplit[1].substring(0, 2);
  }

  const result = Number.parseFloat(stringValue);
  if (isNaN(result)) {
    return 0;
  }

  return result;
}

export const parserNumber = (value: string | undefined) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  const stringValue = String(value);
  if (stringValue === '-') {
    return stringValue;
  }

  const result = Number.parseFloat(stringValue);
  if (isNaN(result)) {
    return ''
  }
  let display = String(result).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (stringValue.indexOf('.') === stringValue.length - 1) {
    display += '.';
  }
  return display;
}
export const formatDate = (value: any) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  const date: string = value && moment(value).format('DD/MM/YYYY');
  return date || "";
}
export const formatMonth = (value: any) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  const date: string = value && moment(value).format('MM/YYYY');
  return date || "";
}
export const formatYear = (value: any) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  const date: string = value && moment(value).format('YYYY');
  return date || "";
}
export const formatYearMonth = (value: any) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  const date: string = value && moment(value).format('YYYYMM');
  return date || "";
}
export const formatYearMonthDay = (value: any) => {
  //const appState: ApplicationState = configureAppStore(AppInitialState).getState();
  const date: string = value && moment(value).format('YYYYMMDD');
  return date || "";
}
export const parserYearMonth = (value: string) => {
  return moment(value, "YYYYMM");
}
export const decimalToMonthYear = (value:string) => {
  if(value === undefined){
    return "";
  }
  return moment(value,"YYYYMM").format('MM/YYYY');
}
export const monthYearTodecimal = (value:string) => {
  if(value === undefined){
    return "";
  }
  return moment(value,"MM/YYYY").format('YYYYMM');
}
export const monthYearSubtractTodecimal = (value:string) => {
  if(value === undefined){
    return "";
  }
  return moment(value,"YYYY-MM").format('YYYYMM');
}
export const parserDate = (value: string) => {
  return parserMoment(moment(new Date(value)));
}
export const parserMoment = (moment: moment.Moment) => {
  return moment.format('YYYY-MM-DD');
}
export const parserMomentTime = (moment: moment.Moment) => {
  return moment.format('YYYY-MM-DD HH:mm:ss');
}

export const parserDateTime = (value: string) => {
  return parserMomentTime(moment(new Date(value)));
}
export const getFirstDayOfMonth = (value?: string) => {
  const firstDay = moment(value ? new Date(value): new Date()).clone().startOf('month');
  return firstDay;
}
export const getEndDayOfMonth = (value: string) => {
  const firstDay = moment(new Date(value)).clone().endOf('month');
  return firstDay;
}
export const getStartOfDate = (value?: string) => {
  const firstDay = moment(value ? new Date(value) : new Date()).clone().startOf('day');
  return firstDay;
}
export const getEndOfDate = (value: string) => {
  const firstDay = moment(new Date(value)).clone().endOf('day');
  return firstDay;
}

export const formatQuickDashboardNumber = (value: number) => {
  if (value == undefined) {
    return "0";
  } else {
    return (value > 0 && value < 10) ? "0" + value : value.toString();
  }

}
/*COMMENT: Function sử dụng trong src\components\bigTable\index.tsx
            Format column 'datetime' > datetime -> format
*/
export const formatDateTime = (value: any) => {
  const dateTime: string = value && moment(value).format('DD/MM/YYYY HH:mm:ss');
  return dateTime || "";
}
export const parserDateToString = (value: Date | moment.Moment) => {
  return value.toString();
}

// Get mark Color
export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';
  return 'red'
}

export const capitalizeString = (str: string): string => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};