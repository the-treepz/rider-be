import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import { UnknownInterface } from '../../lib/unknown.interface';

const EmailTemplatesHelper = {
  generateTemplate(data: UnknownInterface, templateURL: string) {
    nunjucks.configure({ autoescape: true });
    const html = fs
      .readFileSync(path.join(__dirname, `./../template/${templateURL}`))
      .toString('utf-8');
    return nunjucks.renderString(html, data);
  },
};
export default EmailTemplatesHelper;
