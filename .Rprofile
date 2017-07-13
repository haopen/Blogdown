options(
  # https://bookdown.org/yihui/blogdown/global-options.html 下面的选项的说明
  # https://bookdown.org/yihui/blogdown/methods.html custom 方法的说明，也可以参考帮助文档 blogdown::buildsite()
  # https://github.com/rbind/daijiang/blob/master/.Rprofile 示例
  # servr.daemon 默认为 FALSE，而上面的地址改成了 TRUE
  # blogdown.method = 'custom' 这句用于在 R/*.* 中自定义编译过程
  digits = 4, servr.daemon = FALSE, formatR.indent = 2, blogdown.publishDir = '../haopen-public', blogdown.subdir = 'prof'
)

# local({
#   pandoc_path = Sys.getenv('RSTUDIO_PANDOC', NA)
#   if (Sys.which('pandoc') == '' && !is.na(pandoc_path)) Sys.setenv(PATH = paste(
#     Sys.getenv('PATH'), pandoc_path,
#     sep = if (.Platform$OS.type == 'unix') ':' else ';'
#   ))
# })