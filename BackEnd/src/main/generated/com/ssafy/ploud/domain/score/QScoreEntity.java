package com.ssafy.ploud.domain.score;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScoreEntity is a Querydsl query type for ScoreEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScoreEntity extends EntityPathBase<ScoreEntity> {

    private static final long serialVersionUID = -123960190L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScoreEntity scoreEntity = new QScoreEntity("scoreEntity");

    public final NumberPath<Integer> clarity = createNumber("clarity", Integer.class);

    public final NumberPath<Integer> eye = createNumber("eye", Integer.class);

    public final NumberPath<Integer> grade = createNumber("grade", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.ssafy.ploud.domain.speech.QSpeechEntity speech;

    public final NumberPath<Integer> speed = createNumber("speed", Integer.class);

    public final NumberPath<Integer> volume = createNumber("volume", Integer.class);

    public QScoreEntity(String variable) {
        this(ScoreEntity.class, forVariable(variable), INITS);
    }

    public QScoreEntity(Path<? extends ScoreEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScoreEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScoreEntity(PathMetadata metadata, PathInits inits) {
        this(ScoreEntity.class, metadata, inits);
    }

    public QScoreEntity(Class<? extends ScoreEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.speech = inits.isInitialized("speech") ? new com.ssafy.ploud.domain.speech.QSpeechEntity(forProperty("speech"), inits.get("speech")) : null;
    }

}

