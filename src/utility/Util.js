import Consts from './Consts';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';
import Configure from '../component/configure';
import moment from 'moment';

const regexEmail = '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$';
const regexNumber = '^[0-9]{8}$';

export function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const sortSearchResultByKeyword = (array, keyword) => {
  array
    .filter((prof) => {
      // Filter results by doing case insensitive match on keyword here
      return prof.keyword.toLowerCase().includes(keyword?.toLowerCase());
    })
    .sort((a, b) => {
      // Sort results by matching keyword with keyword position in keyword
      if (
        a.keyword.toLowerCase().indexOf(keyword?.toLowerCase()) >
        b.keyword.toLowerCase().indexOf(keyword?.toLowerCase())
      ) {
        return 1;
      } else if (
        a.keyword.toLowerCase().indexOf(keyword?.toLowerCase()) <
        b.keyword.toLowerCase().indexOf(keyword?.toLowerCase())
      ) {
        return -1;
      } else {
        if (a.keyword > b.keyword) return 1;
        else return -1;
      }
    });
  return array;
};

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export const getFileExt = (fileName) => {
  return fileName.substring(fileName.lastIndexOf('.') + 1);
};

export const getFileName = (fileName) => {
  return fileName.replace('.' + getFileExt(fileName), '');
};

export const useClickOutSide = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };

    // eslint-disable-next-line
  }, []);
  return domNode;
};

export function mailNumber(mailNumber) {
  if (mailNumber.match(regexEmail)) {
    let arry = mailNumber.split('@');
    let name = arry[0].split('');
    for (let i = 2; i < name.length - 1; i++) {
      name[i] = '*';
    }
    arry[0] = name.join('');
    mailNumber = arry[0] + '@' + arry[1];
    return mailNumber;
  } else if (mailNumber.match(regexNumber)) {
    let arry = mailNumber.split('');
    for (let i = 2; i < arry.length - 3; i++) {
      arry[i] = '*';
    }
    mailNumber = arry.join('');
    return mailNumber;
  } else {
    return 'Мэйл эсвэл утасны дугаар оруулна уу';
  }
}

export function checkUsernameType(mailNumber) {
  if (mailNumber.match(regexEmail)) {
    return Consts.typeEmail;
  } else if (mailNumber.match(regexNumber)) {
    return Consts.typePhoneNumber;
  } else {
    return Consts.typeMismatch;
  }
}

export function number(number) {
  let regexNumber = '^[0-9]+$';
  if (number.match(regexNumber)) {
    return number;
  } else {
    return alert('Зөвхөн тоо бичнэ үү');
  }
}

export function name(name) {
  let regexName = /^[A-Za-z]+$/;
  if (name.match(regexName)) {
    return name;
  } else {
    return alert('Хэрэглэгчийн нэр зөвхөн том жижиг үсгээс бүрдсэн');
  }
}

export function mergeDate(year, month, day) {
  return year + '-' + month + '-' + day;
}

export function unmergeDate(date) {
  let returnDate = {
    year: '',
    month: '',
    day: '',
  };

  if (date) {
    let splitedDate = date.split('-');

    returnDate = {
      year: splitedDate[0],
      month: splitedDate[1],
      day: splitedDate[2],
    };
  }

  return returnDate;
}

export function isFilledObj(obj) {
  return Object.keys(obj).length > 0;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function generateFileUrl(file) {
  if (file) {
    if (file.bucket.includes('dev')) {
      return 'https://bucket-dev.caak.mn/' + file.level + '/' + file.id + '.' + file.ext;
    } else {
      return 'https://bucket.caak.mn/' + file.level + '/' + file.id + '.' + file.ext;
    }
    // return (
    //   "https://" +
    //   file.bucket +
    //   ".s3." +
    //   file.region +
    //   ".amazonaws.com/" +
    //   file.level +
    //   "/" +
    //   file.id +
    //   "." +
    //   file.ext
    // );
  }

  return null;
}

export const extractDate = (date) => {
  const { year, month, day } = DateTime.fromISO(date);
  return { year, month, day };
};

// Postiin uussen ognoog ni stringeer avch heden second/minute/tsagiin/odriin omno uussniig stringeer butsaadag funkts
// export function generateTimeAgo(date) {
//   const postdate = DateTime.fromISO(date);
//   const today = DateTime.now();
//   const diff = today.diff(postdate, [
//     "years",
//     "months",
//     "days",
//     "hours",
//     "minutes",
//     "seconds",
//     "milliseconds",
//   ]);
//   if (diff.years !== 0 || diff.months !== 0) {
//     return (
//       postdate.year +
//       "." +
//       (postdate.month < 10 ? `0${postdate.month}` : postdate.month) +
//       "." +
//       postdate.day
//     );
//   } else if (diff.days !== 0) {
//     return diff.days + " өдөр";
//   } else if (diff.hours !== 0) {
//     return diff.hours + " цаг";
//   } else if (diff.minutes !== 0) {
//     return diff.minutes + " мин";
//   } else if (diff.seconds !== 0) {
//     return diff.seconds + " сек";
//   } else {
//     return "Сая";
//   }
// }

export function generateTimeAgo(date) {
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = now - time;
  if (diff / 1000 / 60 / 60 / 24 / 30 > 1) {
    return moment(date).format('YYYY-MM-DD');
  } else if (diff / 1000 / 60 / 60 / 24 > 1) {
    return Math.floor(diff / 1000 / 60 / 60 / 24) + ' хоног';
  } else if (diff / 1000 / 60 / 60 > 1) {
    return Math.floor(diff / 1000 / 60 / 60) + ' цаг';
  } else if (diff / 1000 / 60 > 1) {
    return Math.floor(diff / 1000 / 60) + ' мин';
  } else if (diff / 1000 > 1) {
    return Math.floor(diff / 1000) + ' секунд';
  }
}

export function getDate(date) {
  const postDate = DateTime.fromISO(date);
  return postDate.toLocaleString();
}

export function checkUser(user) {
  if (!user) {
    return false;
  } else {
    if (!user.sysUser) {
      return false;
    }
  }

  return true;
}

export function closeModal(history, state) {
  if (state && state.background) {
    history.goBack();
  } else {
    history.replace('/');
  }
}

export function checkUsername(username) {
  let usrname = username;

  if (checkUsernameType(usrname) === Consts.typePhoneNumber) {
    usrname = '+976' + usrname;
  }

  return usrname;
}

export function getFileUrl(file) {
  let retUrl;

  if (file) {
    if (file.url) {
      retUrl = file.url;
    } else if (file.isExternal === 'TRUE') {
      if (file.type === 'EMBED') {
        if (file.provider === 'youtube') {
          retUrl = `https://youtube.com/watch?v=${file.provided_item}`;
        }
      } else {
        retUrl = `https://media.caak.mn/${file.external_url}`;
      }
    } else {
      retUrl = generateFileUrl(file);
    }
  }

  return retUrl;
}

export function removeKeyFromObj(obj, removeKeys) {
  removeKeys.map((key) => {
    delete obj[key];
    return true;
  });
}

export function getReturnData(data, isSubscription) {
  let retData = {};

  if (isSubscription) {
    retData = data.value.data;
  } else {
    retData = data.data;
  }

  retData = retData[Object.keys(retData)[0]];
  return retData;
}

export const checkAdminModerator = (role) => {
  if (role === 'ADMIN') return true;
  return role === 'MODERATOR';
};

export function _objectWithoutKeys(obj, keys) {
  let target = {};

  for (let key in obj) {
    if (keys.indexOf(key) < 0) {
      target[key] = obj[key];
    }
  }

  return target;
}

export async function fetcher(url) {
  const resp = await fetch(url);
  return resp.json();
}

export function findMatchIndex(arr, key, value) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) {
      index = i;
      break;
    }
  }

  return index;
}

export function getURLUserName(url, type) {
  if (url) {
    let output = url;
    let matches;

    // Parse username
    matches = url.match(
      /(?:https?:\/\/)?(?:www.)?(?:twitter|tiktok|medium|facebook|vimeo|instagram)(?:.com\/)?([@a-zA-Z0-9-_]+)/im,
    );

    // Set output
    if (type === 'CHECK') {
      output = matches ? true : false;
    } else {
      output = matches && matches.length ? matches[1] : output;
    }

    return output;
  }
}

export const getDiffDays = (start, end) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((end - start) / oneDay);
};

export const convertDateTime = (date) => {
  const Date = DateTime.fromISO(date);
  const fullDate = Date.toFormat('yyyy/MM/dd');
  const fullTime = Date.toFormat('HH:mm:ss');
  return `${fullDate} ${fullTime}`;
};

export const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
};

export function numberWithCommas(x, separator) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  } else return x;
}

export const addDays = (date, days) => {
  let result = new Date(date);
  if (days) {
    result.setDate(result.getDate() + parseInt(days));
  }
  return result;
};

export const differenceDate = (date1, date2) => {
  let diffDays;
  if (date1 && date2) {
    const diffTime = Math.abs(date1 - date2);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return diffDays;
};

export const imagePath = (src) => {
  // return `http://graph.caak.mn${src}`;
  if (!src) return false;
  return `${Configure.host}/${src}`;
};

const object = {
  mailNumber,
  name,
  number,
  mergeDate,
  unmergeDate,
  checkUsernameType,
  checkUsername,
  getRandomInt,
  generateFileUrl,
  checkUser,
  closeModal,
  getFileUrl,
  getReturnData,
  _objectWithoutKeys,
  getURLUserName,
  getDiffDays,
  convertDateTime,
  kFormatter,
  numberWithCommas,
  addDays,
  differenceDate,
  generateTimeAgo,
};
export default object;
