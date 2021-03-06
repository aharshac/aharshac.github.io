import React, { PropTypes } from "react"
import warning from "warning"
import { BodyContainer } from "phenomic"
import moment from "moment";

import Loading from "../../components/Loading"
import Category from "../../components/Category"
import Button from "../../components/Button"
import Emoji from "../../components/Emoji"
import ToolIconBar from '../../components/ToolIconBar';
import TagBar from '../../components/TagBar';
import PageHead from '../../components/PageHead';
import LinkExt from '../../components/LinkExt';

import styles from "./index.css"

import "../../styles/content.md.css"
import "../../styles/table.md.css"

const Project = (
  {
    isLoading, __filename, __url, head, body,
  },
  {
    metadata: { networks: { twitter_id } },
  }
) => {
  warning(
    typeof head.title === "string",
    `Your page '${ __filename }' needs a title`
  )

  const {
    title, metaTitle, description,
    cizm_path, published, cta, category, cover, hero, date_end, date, skills, github, npm,
    assoc_id, assoc_name,
  } = head;


  const project_path = (cizm_path && published) ? cizm_path : null;
  const cta_title = project_path ? 'Join Project' : null;

  const durStart = date && moment(date).isValid() ? moment(date).format('MMM YYYY') : null;
  const durEnd = date_end && moment(date_end).isValid() ? moment(date_end).format('MMM YYYY') : null;

  return (
    <div className={ styles.page }>
      <PageHead title={title} metaTitle={metaTitle} hero={hero} url={__url} description={description} twitter={twitter_id} />

      <div
        className={ styles.hero }
        style={ cover && {
          background: `url(${ cover || hero }) 50% 50% / cover`,
        }}
      >
        <div className={ styles.header }>
          <div className={ styles.wrapper }>
            <h1 className={ styles.heading }>{ title }</h1>
            { description && <h2 className={ styles.description }>{ description }</h2> }
            {
              (cta_title || (cta && cta.link && cta.label)) &&
              <LinkExt to={ project_path || cta.link } >
                <Button className={ styles.cta }>
                  { cta_title || cta.label }
                </Button>
              </LinkExt>
            }
          </div>
        </div>
      </div>

      <div className={ styles.wrapper + " " + styles.pageContent }>
        {
          isLoading ?
          <Loading /> :

          <div className={ styles.body }>
            {
              cizm_path &&
              <div className={ styles.meta }>
                <span className={styles.duration} >
                  { durStart && <time key={durStart} > {durStart} </time> }
                  { (durStart && durEnd) && ' - ' }
                  { durEnd && <time key={durEnd} > {durEnd} </time> }
                </span>
                { skills && <TagBar tags={skills} style={styles.skills} /> }
                { <ToolIconBar style={styles.toolbar} collaborizm={cizm_path} github={github} npm={npm} width="1.4em" /> }

              { (cizm_path || github) &&  <p className={styles.metaP}> <Emoji text="heart" />  Open Source  <Emoji text="heart" /> </p> }
              { (assoc_id && assoc_name) &&
                <p className={styles.metaP}>
                  {`With`}
                  <LinkExt to={`https://www.collaborizm.com/profile/${assoc_id}`} className={ styles.readMore + " " + styles.collaborizm }>
                    { assoc_name }
                  </LinkExt>
                </p>
              }
              </div>
            }

            {
              cizm_path &&
              <div>
                { category && <Category text={category} /> }

                <div className={ styles.cizmLink }>
                  This project is hosted on
                  <LinkExt to="https://www.collaborizm.com/" className={ styles.readMore + " " + styles.collaborizm } >
                    Collaborizm.com
                  </LinkExt>
                </div>
              </div>
            }

            <BodyContainer>
                { body }
            </BodyContainer>

            {
              cizm_path &&
              <div className={ styles.cizmLink + " " + styles.cizmThread }>
                <hr className={ styles.cizmSeparator} />
                Join the project at
                <LinkExt to={ cizm_path } className={ styles.readMore } >
                  { cizm_path }
                </LinkExt>
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

Project.propTypes = {
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
}

Project.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Project
