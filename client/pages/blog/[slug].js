import { useRef, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Blog.module.css'
import { connect } from "react-redux"

import { getBySlug, addComment } from "../../src/services/api.blog.service"

function Blog(props) {
    const { blog } = props

    const textArea = useRef(null)

    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState(null)
    const [reply, setReply] = useState(null)
    const [comments, setComments] = useState(blog.comments)
    const handleComment = (e) => {
        e.preventDefault()
        setLoading(true)
        const body = {
            author: props.user.id,
            body: comment,
            commentId: reply
        }
        addComment(blog.slug, body).then(res => {
            let newComments = [...comments]
            if (reply) {
                newComments.find(e => e._id == reply).replies.push({
                    author: props.user,
                    body: comment,
                    createdAt: new Date(),
                })
            } else {
                newComments.push({
                    author: props.user,
                    body: comment,
                    createdAt: new Date(),
                    replies: []
                })
            }

            setComments(newComments)
            setComment(null)
            setLoading(false)
            setReply(null)
        }).catch(e => {
            setLoading(false)
        })
    }

    const handleReply = (e, id) => {
        e.preventDefault()
        textArea.current.focus()
        setReply(id)
    }
    return (
        <>
            <Head>
                <title>Pierre Gassin | {blog.title}</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <link rel="icon" href="/logo-pierre-3.png" />
            </Head>
            <header className="w-100 mx-0 overflow-hidden">
                <div className={styles.blogPageHeader} style={{
                    backgroundImage: "url('" + blog.cover + "')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    {/* <Image layout='fill'
                        src={"https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg"}
                        objectFit='cover'
                        objectPosition='center center'
                    /> */}
                </div>
            </header>
            <div style={{ backgroundColor: '#f0f0f0' }} className="w-100">
                <main>
                    <div className="mx-5 px-5 mb-5 pb-5 container mx-0 overflow-hidden">
                        <h1 className={`${styles.blogPageTitle}`}>{blog.title}</h1>
                        <p className={`${styles.blogPagePara}`}>
                            {blog.description}
                        </p>
                    </div>
                    <div class="container pb-5 bootstrap snippets bootdey">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="blog-comment">
                                    <h3 class="text-secondary">Commentaires</h3>
                                    <hr />
                                    <ul class="comments">
                                        {
                                            comments.map(e => {
                                                return <li class="clearfix" key={e._id}>
                                                    {/* <img src="https://bootdey.com/img/Content/user_2.jpg" class="avatar" alt="" /> */}
                                                    <div class="post-comments">
                                                        <p class="meta">{
                                                            new Intl.DateTimeFormat("en-AU", { month: 'short', day: '2-digit', 'year': 'numeric' })
                                                                .format(new Date(e.createdAt))
                                                        }
                                                            <a href="#"> {e.author.first_name + " " + e.author.last_name}</a> : <i class="pull-right"><a href="#" onClick={(event) => handleReply(event, e._id)}><small>Répondre</small></a></i></p>
                                                        <p>
                                                            {e.body}
                                                        </p>
                                                    </div>

                                                    <ul class="comments">
                                                        {
                                                            e.replies.map(r => {
                                                                return <li class="clearfix" key={r._id}>
                                                                    {/* <img src="https://bootdey.com/img/Content/user_3.jpg" class="avatar" alt="" /> */}
                                                                    <div class="post-comments">
                                                                        <p class="meta">{
                                                                            new Intl.DateTimeFormat("en-AU", { month: 'short', day: '2-digit', 'year': 'numeric' })
                                                                                .format(new Date(r.createdAt))
                                                                        }
                                                                            <a href="#"> {r.author.first_name + " " + r.author.last_name}</a> : <i class="pull-right"></i></p>
                                                                        <p>
                                                                            {r.body}
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </li>
                                            })
                                        }
                                    </ul>
                                    {
                                        props.isLoggedIn &&
                                        <div>
                                            <form className="comment-form w-100" onSubmit={handleComment}>
                                                <textarea value={comment} ref={textArea} onChange={(e) => setComment(e.target.value)} className="w-100 text-left" style={{ backgroundColor: '#fff' }}>

                                                </textarea>
                                                <input disabled={loading} type='submit' className="btn btn-success float-right" value='Envoyer' />
                                            </form>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const slug = context.query.slug
    const result = await getBySlug(slug)
    return {
        props: {
            blog: result.data
        }, // will be passed to the page component as props
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
});


export default connect(mapStateToProps)(Blog);