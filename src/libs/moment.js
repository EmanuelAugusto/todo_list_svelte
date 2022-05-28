import moment from "moment"

export const DateTime = () => {
    return moment().format('YYYY-MM-DD H:mm:ss')
}