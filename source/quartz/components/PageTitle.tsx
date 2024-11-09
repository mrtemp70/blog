import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const fullUrl = `${baseDir}/blog`;
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={fullUrl}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.15rem;
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
