import moment from 'moment'
import { DateFormat } from '../api/type'


/**
 * Convert date with custom format
 * @param value
 * @param format
 */
export const convertDateWithFormat = (value: any, format: string) => {
  const date: string = value && moment(value).format(format)
  return date || ''
}

/**
 * Convert date to serve format YYYY-MM-DD HH:mm:ss
 * @param value
 */
export const convertDate = (value: any): string => {
  const date: string = value && moment(value).format(DateFormat.SERVER_FORMAT_DATE_TIME)
  return date || ''
}

/**
 * Get current date time string.
 * @returns 
 */
export const getCurrentDateTime = () => {
  return moment().format(DateFormat.SERVER_FORMAT_DATE_TIME)
}

/**
 * Get current date string.
 * @returns 
 */
export const getCurrentDate = () => {
  return moment().format(DateFormat.SERVER_FORMAT_DEFAULT)
}